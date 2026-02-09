import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LZString from "lz-string";
import { Terminal } from "./components/Terminal";
const THEME = {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      background: "011627",
      token: "",
    },
    {
      foreground: "637777",
      token: "comment",
    },
    {
      foreground: "addb67",
      token: "string",
    },
    {
      foreground: "ecc48d",
      token: "vstring.quoted",
    },
    {
      foreground: "ecc48d",
      token: "variable.other.readwrite.js",
    },
    {
      foreground: "5ca7e4",
      token: "string.regexp",
    },
    {
      foreground: "5ca7e4",
      token: "string.regexp keyword.other",
    },
    {
      foreground: "5f7e97",
      token: "meta.function punctuation.separator.comma",
    },
    {
      foreground: "f78c6c",
      token: "constant.numeric",
    },
    {
      foreground: "f78c6c",
      token: "constant.character.numeric",
    },
    {
      foreground: "addb67",
      token: "variable",
    },
    {
      foreground: "c792ea",
      token: "keyword",
    },
    {
      foreground: "c792ea",
      token: "punctuation.accessor",
    },
    {
      foreground: "c792ea",
      token: "storage",
    },
    {
      foreground: "c792ea",
      token: "meta.var.expr",
    },
    {
      foreground: "c792ea",
      token:
        "meta.class meta.method.declaration meta.var.expr storage.type.jsm",
    },
    {
      foreground: "c792ea",
      token: "storage.type.property.js",
    },
    {
      foreground: "c792ea",
      token: "storage.type.property.ts",
    },
    {
      foreground: "c792ea",
      token: "storage.type.property.tsx",
    },
    {
      foreground: "82aaff",
      token: "storage.type",
    },
    {
      foreground: "ffcb8b",
      token: "entity.name.class",
    },
    {
      foreground: "ffcb8b",
      token: "meta.class entity.name.type.class",
    },
    {
      foreground: "addb67",
      token: "entity.other.inherited-class",
    },
    {
      foreground: "82aaff",
      token: "entity.name.function",
    },
    {
      foreground: "addb67",
      token: "punctuation.definition.variable",
    },
    {
      foreground: "d3423e",
      token: "punctuation.section.embedded",
    },
    {
      foreground: "d6deeb",
      token: "punctuation.terminator.expression",
    },
    {
      foreground: "d6deeb",
      token: "punctuation.definition.arguments",
    },
    {
      foreground: "d6deeb",
      token: "punctuation.definition.array",
    },
    {
      foreground: "d6deeb",
      token: "punctuation.section.array",
    },
    {
      foreground: "d6deeb",
      token: "meta.array",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.definition.list.begin",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.definition.list.end",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.separator.arguments",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.definition.list",
    },
    {
      foreground: "d3423e",
      token: "string.template meta.template.expression",
    },
    {
      foreground: "d6deeb",
      token: "string.template punctuation.definition.string",
    },
    {
      foreground: "c792ea",
      fontStyle: "italic",
      token: "italic",
    },
    {
      foreground: "addb67",
      fontStyle: "bold",
      token: "bold",
    },
    {
      foreground: "82aaff",
      token: "constant.language",
    },
    {
      foreground: "82aaff",
      token: "punctuation.definition.constant",
    },
    {
      foreground: "82aaff",
      token: "variable.other.constant",
    },
    {
      foreground: "7fdbca",
      token: "support.function.construct",
    },
    {
      foreground: "7fdbca",
      token: "keyword.other.new",
    },
    {
      foreground: "82aaff",
      token: "constant.character",
    },
    {
      foreground: "82aaff",
      token: "constant.other",
    },
    {
      foreground: "f78c6c",
      token: "constant.character.escape",
    },
    {
      foreground: "addb67",
      token: "entity.other.inherited-class",
    },
    {
      foreground: "d7dbe0",
      token: "variable.parameter",
    },
    {
      foreground: "7fdbca",
      token: "entity.name.tag",
    },
    {
      foreground: "cc2996",
      token: "punctuation.definition.tag.html",
    },
    {
      foreground: "cc2996",
      token: "punctuation.definition.tag.begin",
    },
    {
      foreground: "cc2996",
      token: "punctuation.definition.tag.end",
    },
    {
      foreground: "addb67",
      token: "entity.other.attribute-name",
    },
    {
      foreground: "addb67",
      token: "entity.name.tag.custom",
    },
    {
      foreground: "82aaff",
      token: "support.function",
    },
    {
      foreground: "82aaff",
      token: "support.constant",
    },
    {
      foreground: "7fdbca",
      token: "upport.constant.meta.property-value",
    },
    {
      foreground: "addb67",
      token: "support.type",
    },
    {
      foreground: "addb67",
      token: "support.class",
    },
    {
      foreground: "addb67",
      token: "support.variable.dom",
    },
    {
      foreground: "7fdbca",
      token: "support.constant",
    },
    {
      foreground: "7fdbca",
      token: "keyword.other.special-method",
    },
    {
      foreground: "7fdbca",
      token: "keyword.other.new",
    },
    {
      foreground: "7fdbca",
      token: "keyword.other.debugger",
    },
    {
      foreground: "7fdbca",
      token: "keyword.control",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.comparison",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.flow.js",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.flow.ts",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.flow.tsx",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.ruby",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.module.ruby",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.class.ruby",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.def.ruby",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.loop.js",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.loop.ts",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.import.js",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.import.ts",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.import.tsx",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.from.js",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.from.ts",
    },
    {
      foreground: "c792ea",
      token: "keyword.control.from.tsx",
    },
    {
      foreground: "ffffff",
      background: "ff2c83",
      token: "invalid",
    },
    {
      foreground: "ffffff",
      background: "d3423e",
      token: "invalid.deprecated",
    },
    {
      foreground: "7fdbca",
      token: "keyword.operator",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.relational",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.assignement",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.arithmetic",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.bitwise",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.increment",
    },
    {
      foreground: "c792ea",
      token: "keyword.operator.ternary",
    },
    {
      foreground: "637777",
      token: "comment.line.double-slash",
    },
    {
      foreground: "cdebf7",
      token: "object",
    },
    {
      foreground: "ff5874",
      token: "constant.language.null",
    },
    {
      foreground: "d6deeb",
      token: "meta.brace",
    },
    {
      foreground: "c792ea",
      token: "meta.delimiter.period",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.definition.string",
    },
    {
      foreground: "ff5874",
      token: "constant.language.boolean",
    },
    {
      foreground: "ffffff",
      token: "object.comma",
    },
    {
      foreground: "7fdbca",
      token: "variable.parameter.function",
    },
    {
      foreground: "80cbc4",
      token: "support.type.vendor.property-name",
    },
    {
      foreground: "80cbc4",
      token: "support.constant.vendor.property-value",
    },
    {
      foreground: "80cbc4",
      token: "support.type.property-name",
    },
    {
      foreground: "80cbc4",
      token: "meta.property-list entity.name.tag",
    },
    {
      foreground: "57eaf1",
      token: "meta.property-list entity.name.tag.reference",
    },
    {
      foreground: "f78c6c",
      token: "constant.other.color.rgb-value punctuation.definition.constant",
    },
    {
      foreground: "ffeb95",
      token: "constant.other.color",
    },
    {
      foreground: "ffeb95",
      token: "keyword.other.unit",
    },
    {
      foreground: "c792ea",
      token: "meta.selector",
    },
    {
      foreground: "fad430",
      token: "entity.other.attribute-name.id",
    },
    {
      foreground: "80cbc4",
      token: "meta.property-name",
    },
    {
      foreground: "c792ea",
      token: "entity.name.tag.doctype",
    },
    {
      foreground: "c792ea",
      token: "meta.tag.sgml.doctype",
    },
    {
      foreground: "d9f5dd",
      token: "punctuation.definition.parameters",
    },
    {
      foreground: "ecc48d",
      token: "string.quoted",
    },
    {
      foreground: "ecc48d",
      token: "string.quoted.double",
    },
    {
      foreground: "ecc48d",
      token: "string.quoted.single",
    },
    {
      foreground: "addb67",
      token: "support.constant.math",
    },
    {
      foreground: "addb67",
      token: "support.type.property-name.json",
    },
    {
      foreground: "addb67",
      token: "support.constant.json",
    },
    {
      foreground: "c789d6",
      token: "meta.structure.dictionary.value.json string.quoted.double",
    },
    {
      foreground: "80cbc4",
      token: "string.quoted.double.json punctuation.definition.string.json",
    },
    {
      foreground: "ff5874",
      token:
        "meta.structure.dictionary.json meta.structure.dictionary.value constant.language",
    },
    {
      foreground: "d6deeb",
      token: "variable.other.ruby",
    },
    {
      foreground: "ecc48d",
      token: "entity.name.type.class.ruby",
    },
    {
      foreground: "ecc48d",
      token: "keyword.control.class.ruby",
    },
    {
      foreground: "ecc48d",
      token: "meta.class.ruby",
    },
    {
      foreground: "7fdbca",
      token: "constant.language.symbol.hashkey.ruby",
    },
    {
      foreground: "e0eddd",
      background: "a57706",
      fontStyle: "italic",
      token: "meta.diff",
    },
    {
      foreground: "e0eddd",
      background: "a57706",
      fontStyle: "italic",
      token: "meta.diff.header",
    },
    {
      foreground: "ef535090",
      fontStyle: "italic",
      token: "markup.deleted",
    },
    {
      foreground: "a2bffc",
      fontStyle: "italic",
      token: "markup.changed",
    },
    {
      foreground: "a2bffc",
      fontStyle: "italic",
      token: "meta.diff.header.git",
    },
    {
      foreground: "a2bffc",
      fontStyle: "italic",
      token: "meta.diff.header.from-file",
    },
    {
      foreground: "a2bffc",
      fontStyle: "italic",
      token: "meta.diff.header.to-file",
    },
    {
      foreground: "219186",
      background: "eae3ca",
      token: "markup.inserted",
    },
    {
      foreground: "d3201f",
      token: "other.package.exclude",
    },
    {
      foreground: "d3201f",
      token: "other.remove",
    },
    {
      foreground: "269186",
      token: "other.add",
    },
    {
      foreground: "ff5874",
      token: "constant.language.python",
    },
    {
      foreground: "82aaff",
      token: "variable.parameter.function.python",
    },
    {
      foreground: "82aaff",
      token: "meta.function-call.arguments.python",
    },
    {
      foreground: "b2ccd6",
      token: "meta.function-call.python",
    },
    {
      foreground: "b2ccd6",
      token: "meta.function-call.generic.python",
    },
    {
      foreground: "d6deeb",
      token: "punctuation.python",
    },
    {
      foreground: "addb67",
      token: "entity.name.function.decorator.python",
    },
    {
      foreground: "8eace3",
      token: "source.python variable.language.special",
    },
    {
      foreground: "82b1ff",
      token: "markup.heading.markdown",
    },
    {
      foreground: "c792ea",
      fontStyle: "italic",
      token: "markup.italic.markdown",
    },
    {
      foreground: "addb67",
      fontStyle: "bold",
      token: "markup.bold.markdown",
    },
    {
      foreground: "697098",
      token: "markup.quote.markdown",
    },
    {
      foreground: "80cbc4",
      token: "markup.inline.raw.markdown",
    },
    {
      foreground: "ff869a",
      token: "markup.underline.link.markdown",
    },
    {
      foreground: "ff869a",
      token: "markup.underline.link.image.markdown",
    },
    {
      foreground: "d6deeb",
      token: "string.other.link.title.markdown",
    },
    {
      foreground: "d6deeb",
      token: "string.other.link.description.markdown",
    },
    {
      foreground: "82b1ff",
      token: "punctuation.definition.string.markdown",
    },
    {
      foreground: "82b1ff",
      token: "punctuation.definition.string.begin.markdown",
    },
    {
      foreground: "82b1ff",
      token: "punctuation.definition.string.end.markdown",
    },
    {
      foreground: "82b1ff",
      token: "meta.link.inline.markdown punctuation.definition.string",
    },
    {
      foreground: "7fdbca",
      token: "punctuation.definition.metadata.markdown",
    },
    {
      foreground: "82b1ff",
      token: "beginning.punctuation.definition.list.markdown",
    },
  ],
  colors: {
    "editor.foreground": "#d6deeb",
    "editor.background": "#011627",
    "editor.selectionBackground": "#5f7e9779",
    "editor.lineHighlightBackground": "#010E17",
    "editorCursor.foreground": "#80a4c2",
    "editorWhitespace.foreground": "#2e2040",
    "editorIndentGuide.background": "#5e81ce52",
    "editor.selectionHighlightBorder": "#122d42",
  },
};
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
      new Function(codeString)();
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
    _monaco.editor.defineTheme("custom-dark", THEME);
    _monaco.editor.setTheme("custom-dark");
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#011627]">
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
            fontSize: 10,
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
