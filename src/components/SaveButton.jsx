import React from "react";
import "./SaveButton.css";

const SaveButton = ({ nodes, edges, onSave, onError }) => {
  const validateFlow = () => {
    // Check if there are more than one node
    if (nodes.length <= 1) {
      return { isValid: true };
    }

    // Find nodes with empty target handles (no incoming edges)
    const nodesWithEmptyTargets = nodes.filter((node) => {
      const hasIncomingEdges = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdges;
    });

    // If more than one node has empty target handles, show error
    if (nodesWithEmptyTargets.length > 1) {
      return {
        isValid: false,
        error: `Cannot save Flow: ${nodesWithEmptyTargets.length} nodes have empty target handles`,
      };
    }

    return { isValid: true };
  };

  const handleSave = () => {
    const validation = validateFlow();

    if (!validation.isValid) {
      onError(validation.error);
      return;
    }

    // If validation passes, proceed with save
    onSave();
  };

  return (
    <div className="save-button-container">
      <button
        className="save-button"
        onClick={handleSave}
        title="Save the current flow"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SaveButton;
