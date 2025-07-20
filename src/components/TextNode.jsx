import React, { memo } from "react";
import BaseNode from "./BaseNode";

const TextNode = memo(({ data, selected, id }) => {
  const handleDelete = (nodeId) => {
    const deleteEvent = new CustomEvent("deleteNode", {
      detail: { nodeId },
    });
    window.dispatchEvent(deleteEvent);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      onDelete={handleDelete}
      nodeType="text"
      icon="💬"
    />
  );
});

export default TextNode;
