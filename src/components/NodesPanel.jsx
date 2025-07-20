import React from "react";

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
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Nodes</h3>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {nodeTypes.map((nodeType) => {
          return (
            <div
              key={nodeType.type}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-move hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
              draggable
              onDragStart={(event) =>
                onDragStart(event, nodeType.type, nodeType.label)
              }
              style={{
                borderLeftColor: nodeType.color,
                borderLeftWidth: "4px",
              }}
            >
              <div className="text-2xl" style={{ color: nodeType.color }}>
                {nodeType.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">
                  {nodeType.label}
                </div>
                <div className="text-sm text-slate-600">
                  {nodeType.description}
                </div>
              </div>
              <div className="text-slate-400 text-lg">➕</div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <p className="text-sm text-slate-500 text-center">
          More node types coming soon!
        </p>
      </div>
    </div>
  );
};

export default NodesPanel;
