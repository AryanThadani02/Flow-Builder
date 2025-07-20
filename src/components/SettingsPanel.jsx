import React from "react";
import "./SettingsPanel.css";

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
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onBack}>
          ☰
        </button>
        <h3>Message</h3>
      </div>

      <div className="settings-content">
        <div className="setting-group">
          <label className="setting-label">Title</label>
          <input
            type="text"
            className="setting-input"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
            placeholder="Enter node title..."
          />
        </div>

        <div className="setting-group">
          <label className="setting-label">Text</label>
          <textarea
            className="setting-textarea"
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
