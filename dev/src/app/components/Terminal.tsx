import { X, Share2, Play, Square } from "lucide-react";

interface TerminalOutput {
  type: "log" | "error" | "warn" | "info";
  content: string;
  timestamp: number;
}

interface TerminalProps {
  output: TerminalOutput[];
  onClear: () => void;
  onShare: () => void;
  onRun: () => void;
}

export function Terminal({ output, onClear, onShare, onRun }: TerminalProps) {
  const getOutputColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-gray-200";
    }
  };

  return (
    <div className="h-32 bg-[#011627] border-t border-[#637777] flex flex-col">
      {/* Terminal Output */}
      <div className="flex-1 overflow-auto p-3 font-mono text-sm">
        <div className="space-y-1">
          {output.map((item, index) => (
            <div
              key={index}
              style={{ fontSize: "10px" }}
              className={`${getOutputColor(
                item.type
              )} whitespace-pre-wrap break-words`}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Actions */}
      <div className="h-6 border-t border-[#637777] flex items-center justify-end gap-2 px-5">
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-white transition-colors"
          title="Clear (Esc)"
        >
          <X className="w-3 h-3" />
        </button>
        <button
          onClick={window.globalThis._openApp}
          className="text-gray-400 hover:text-white transition-colors"
          title="Open App"
        >
          <Square className="w-3 h-3" />
        </button>
        <button
          onClick={onShare}
          className="text-gray-400 hover:text-white transition-colors"
          title="Share"
        >
          <Share2 className="w-3 h-3" />
        </button>
        <button
          onClick={onRun}
          className="text-gray-400 hover:text-white transition-colors"
          title="Run (Ctrl/Cmd+S)"
        >
          <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
