import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LZString from "lz-string";
import { Terminal } from "./components/Terminal";

interface TerminalOutput {
  type: "log" | "error" | "warn" | "info";
  content: string;
  timestamp: number;
}
const initialCode =
  '// Write your JavaScript code here\nconsole.log("Hello, World!");';
export default function App() {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const editorRef = useRef<any>(null);

  // Load code from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const compressed = params.get("s");
    const autoRun = params.get("r");

    if (compressed) {
      try {
        const decompressed = LZString.decompressFromBase64(
          decodeURIComponent(compressed)
        );
        if (decompressed) {
          setCode(decompressed);
          if (autoRun) {
            // Wait a bit for the editor to load
            setTimeout(() => runCode(decompressed), 500);
          }
        }
      } catch (error) {
        console.error("Failed to decompress code from URL:", error);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to run
      if (e.key.toLowerCase() === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        runCode();
      }
      // Escape to clear terminal
      else if (e.key === "Escape") {
        setOutput([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [code]);

  const runCode = (codeToRun?: string) => {
    const codeString = codeToRun || code;
    setOutput([]);

    // Capture console methods
    const logs: TerminalOutput[] = [];
    const originalConsole = { ...console };

    const captureLog = (
      type: "log" | "error" | "warn" | "info",
      ...args: any[]
    ) => {
      const content = args
        .map((arg) => {
          if (typeof arg === "object") {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(" ");

      logs.push({ type, content, timestamp: Date.now() });
    };

    // Override console methods
    console.log = (...args) => captureLog("log", ...args);
    console.error = (...args) => captureLog("error", ...args);
    console.warn = (...args) => captureLog("warn", ...args);
    console.info = (...args) => captureLog("info", ...args);

    try {
      // Execute code
      const result = eval(codeString);

      // If there's a return value and nothing was logged, show it
      if (result !== undefined && logs.length === 0) {
        logs.push({
          type: "log",
          content:
            typeof result === "object"
              ? JSON.stringify(result, null, 2)
              : String(result),
          timestamp: Date.now(),
        });
      }
    } catch (error: any) {
      logs.push({
        type: "error",
        content: error.toString(),
        timestamp: Date.now(),
      });
    } finally {
      // Restore console
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      setOutput(logs);
    }
  };

  const handleShare = () => {
    try {
      const compressed = LZString.compressToBase64(code);
      const encoded = encodeURIComponent(compressed);
      const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;

      navigator.clipboard
        .writeText(url)
        .then(() => {
          setOutput([
            {
              type: "info",
              content: "✓ Shareable link copied to clipboard!",
              timestamp: Date.now(),
            },
          ]);
        })
        .catch(() => {
          setOutput([
            {
              type: "info",
              content: url,
              timestamp: Date.now(),
            },
          ]);
        });
    } catch (error) {
      setOutput([
        {
          type: "error",
          content: "Failed to generate share link",
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const handleEditorDidMount = (editor: any, _monaco: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1e1e1e]">
      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 12,
            bracketPairColorization: { enabled: true },
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontLigatures: true,
            lineNumbers: "off",
            tabSize: 2,
            automaticLayout: true,
            renderWhitespace: "boundary",
            guides: {
              indentation: false,
              bracketPairs: true,
              bracketPairsHorizontal: true,
              highlightActiveBracketPair: true,
              highlightActiveIndentation: true,
            },
          }}
        />
      </div>

      {/* Terminal */}
      <Terminal
        output={output}
        onClear={() => setOutput([])}
        onShare={handleShare}
        onRun={() => runCode()}
      />
    </div>
  );
}
