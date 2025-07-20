import React from "react";
import "./NodesPanel.css";

const nodeTypes = [
  {
    type: "textNode",
    label: "Text Message",
    icon: "💬",
    description: "Send a text message to the user",
    color: "#3b82f6",
  },
  // Future node types can be added here
  // {
  //   type: 'imageNode',
  //   label: 'Image Message',
  //   icon: '🖼️',
  //   description: 'Send an image to the user',
  //   color: '#10b981'
  // },
  // {
  //   type: 'buttonNode',
  //   label: 'Button Message',
  //   icon: '🖱️',
  //   description: 'Send interactive buttons',
  //   color: '#f59e0b'
  // }
];

const NodesPanel = () => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/label", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes</h3>
      </div>

      <div className="nodes-list">
        {nodeTypes.map((nodeType) => {
          return (
            <div
              key={nodeType.type}
              className="node-item"
              draggable
              onDragStart={(event) =>
                onDragStart(event, nodeType.type, nodeType.label)
              }
              style={{ borderLeftColor: nodeType.color }}
            >
              <div className="node-icon" style={{ color: nodeType.color }}>
                {nodeType.icon}
              </div>
              <div className="node-info">
                <div className="node-label">{nodeType.label}</div>
                <div className="node-description">{nodeType.description}</div>
              </div>
              <div className="drag-indicator">➕</div>
            </div>
          );
        })}
      </div>

      <div className="panel-footer">
        <p>More node types coming soon!</p>
      </div>
    </div>
  );
};

export default NodesPanel;
