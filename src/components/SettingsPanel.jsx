import React from "react";

const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  const handleLabelChange = (event) => {
    const newLabel = event.target.value;
    onUpdateNode(selectedNode.id, { label: newLabel });
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    onUpdateNode(selectedNode.id, { content: newContent });
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-slate-200">
        <button
          className="text-slate-600 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={onBack}
        >
          ☰
        </button>
        <h3 className="text-lg font-semibold text-slate-800">Message</h3>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
            placeholder="Enter node title..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Text
          </label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={selectedNode.data.content}
            onChange={handleContentChange}
            placeholder="Enter your message here..."
            rows={6}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
