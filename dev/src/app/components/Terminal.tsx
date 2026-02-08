import { X, Share2, Play } from "lucide-react";

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
    <div className="h-48 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
      {/* Terminal Output */}
      <div className="flex-1 overflow-auto p-3 font-mono text-sm">
        {output.length === 0 ? (
          <div className="text-gray-500 italic">
            Run your code to see output here...
          </div>
        ) : (
          <div className="space-y-1">
            {output.map((item, index) => (
              <div
                key={index}
                className={`${getOutputColor(
                  item.type
                )} whitespace-pre-wrap break-words`}
              >
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal Actions */}
      <div className="h-6 border-t border-[#3e3e42] flex items-center justify-end gap-2 px-5">
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-white transition-colors"
          title="Clear (Esc)"
        >
          <X className="w-3 h-3" />
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
