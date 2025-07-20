import React, { useCallback } from "react";
import { Handle } from "@xyflow/react";

const BaseNode = ({
  id,
  data,
  selected,
  children,
  onDelete,
  leftHandle = true,
  rightHandle = true,
  leftHandleType = "target",
  rightHandleType = "source",
  leftHandlePosition = "left",
  rightHandlePosition = "right",
  nodeType = "default",
  icon = "📄",
}) => {
  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(id);
    }
  }, [onDelete, id]);

  return (
    <div
      className={`bg-white border-2 border-slate-200 rounded-lg shadow-md transition-all duration-200 hover:border-blue-500 hover:shadow-lg ${
        selected ? "border-blue-500 shadow-blue-200" : ""
      } min-w-[200px] max-w-[300px]`}
    >
      {/* Left Handle (Target) */}
      {leftHandle && (
        <Handle
          type={leftHandleType}
          position={leftHandlePosition}
          className="w-3 h-3 border-2 border-slate-500 bg-white hover:border-blue-500 hover:bg-blue-500 transition-colors"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 border-b border-slate-100">
        <div className="text-lg">{icon}</div>
        <div className="flex-1 text-sm font-semibold text-slate-700 truncate">
          {data.label || "Untitled"}
        </div>
        <button
          className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
          onClick={handleDelete}
          title="Delete node"
        >
          🗑️
        </button>
      </div>

      {/* Node Content */}
      <div className="p-3">
        {children || (
          <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-md p-2 min-h-[80px] whitespace-pre-wrap break-words leading-relaxed">
            {data.content || "No content"}
          </div>
        )}
      </div>

      {/* Right Handle (Source) */}
      {rightHandle && (
        <Handle
          type={rightHandleType}
          position={rightHandlePosition}
          className="w-3 h-3 border-2 border-slate-500 bg-white hover:border-blue-500 hover:bg-blue-500 transition-colors"
        />
      )}
    </div>
  );
};

export default BaseNode;
