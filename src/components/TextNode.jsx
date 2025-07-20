import React, { memo } from "react";
import BaseNode from "./BaseNode";

const TextNode = memo(({ data, selected, id }) => {
  const handleDelete = (nodeId) => {
    const deleteEvent = new CustomEvent("deleteNode", {
      detail: { nodeId },
    });
    window.dispatchEvent(deleteEvent);
  };

  const handleContentChange = (content) => {
    const updateEvent = new CustomEvent("updateNodeContent", {
      detail: { nodeId: id, content },
    });
    window.dispatchEvent(updateEvent);
  };

  const handleLabelChange = (label) => {
    const updateEvent = new CustomEvent("updateNodeLabel", {
      detail: { nodeId: id, label },
    });
    window.dispatchEvent(updateEvent);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      onContentChange={handleContentChange}
      onLabelChange={handleLabelChange}
      onDelete={handleDelete}
      nodeType="text"
      icon="💬"
    />
  );
});

export default TextNode;
