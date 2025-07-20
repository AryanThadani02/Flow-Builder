import React, { useCallback } from "react";
import { Handle } from "@xyflow/react";
import "./BaseNode.css";

const BaseNode = ({
  id,
  data,
  selected,
  children,
  onContentChange,
  onLabelChange,
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
  const handleContentChange = useCallback(
    (event) => {
      if (onContentChange) {
        onContentChange(event.target.value);
      }
    },
    [onContentChange]
  );

  const handleLabelChange = useCallback(
    (event) => {
      if (onLabelChange) {
        onLabelChange(event.target.value);
      }
    },
    [onLabelChange]
  );

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(id);
    }
  }, [onDelete, id]);

  return (
    <div className={`base-node ${nodeType}-node ${selected ? "selected" : ""}`}>
      {/* Left Handle (Target) */}
      {leftHandle && (
        <Handle
          type={leftHandleType}
          position={leftHandlePosition}
          className="node-handle left-handle"
        />
      )}

      {/* Node Header */}
      <div className="node-header">
        <div className="node-icon">{icon}</div>
        <div className="node-label">{data.label || "Untitled"}</div>
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete node"
        >
          🗑️
        </button>
      </div>

      {/* Node Content */}
      <div className="node-content">
        {children || (
          <div className="node-text-display">
            {data.content || "No content"}
          </div>
        )}
      </div>

      {/* Right Handle (Source) */}
      {rightHandle && (
        <Handle
          type={rightHandleType}
          position={rightHandlePosition}
          className="node-handle right-handle"
        />
      )}
    </div>
  );
};

export default BaseNode;
