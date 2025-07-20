import { useState, useCallback, useRef, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TextNode from './components/TextNode';
import SaveButton from './components/SaveButton';
import ErrorNotification from './components/ErrorNotification';


const initialNodes = [];

const initialEdges = [];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

  const nodeTypes = {
    textNode: TextNode,
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has an edge
      const sourceHandleExists = edges.some(edge =>
        edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );

      if (sourceHandleExists) {
        // Don't add the edge if source handle already has one
        return;
      }

      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    },
    [edges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Calculate position relative to the React Flow container
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // If we have a React Flow instance, transform the position
      if (reactFlowInstance) {
        const transformedPosition = reactFlowInstance.screenToFlowPosition(position);
        position.x = transformedPosition.x;
        position.y = transformedPosition.y;
      }

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: label || 'New Text Node',
          content: 'Enter your message here...'
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onNodeClick = useCallback((event, node) => {
    // Get the latest node data from the current nodes state
    const currentNode = nodes.find(n => n.id === node.id);
    setSelectedNode(currentNode || node);
  }, [nodes]);

  const onPaneClick = useCallback((event) => {
    // Only deselect if clicking on the pane (canvas background), not on nodes
    if (event.target.classList.contains('react-flow__pane')) {
      setSelectedNode(null);
    }
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) =>
      edge.source !== nodeId && edge.target !== nodeId
    ));
    // Clear selection if the deleted node was selected
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const updateNode = useCallback((nodeId, updates) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, ...updates } }
          : n
      )
    );

    // Update the selected node if it's the one being updated
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => ({
        ...prev,
        data: { ...prev.data, ...updates }
      }));
    }
  }, [selectedNode]);

  const handleBackToNodesPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSave = useCallback(() => {
    // Show success message instead of downloading
    setError("✅ Your flow has been saved successfully!");

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, []);

  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Listen for delete node events
  useEffect(() => {
    const handleDeleteNode = (event) => {
      const nodeId = event.detail.nodeId;
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) =>
        edge.source !== nodeId && edge.target !== nodeId
      ));
      // Clear selection if the deleted node was selected
      setSelectedNode((prev) => prev && prev.id === nodeId ? null : prev);
    };

    const handleUpdateNodeContent = (event) => {
      const { nodeId, content } = event.detail;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, content } }
            : n
        )
      );
    };

    const handleUpdateNodeLabel = (event) => {
      const { nodeId, label } = event.detail;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, label } }
            : n
        )
      );
    };

    window.addEventListener('deleteNode', handleDeleteNode);
    window.addEventListener('updateNodeContent', handleUpdateNodeContent);
    window.addEventListener('updateNodeLabel', handleUpdateNodeLabel);

    return () => {
      window.removeEventListener('deleteNode', handleDeleteNode);
      window.removeEventListener('updateNodeContent', handleUpdateNodeContent);
      window.removeEventListener('updateNodeLabel', handleUpdateNodeLabel);
    };
  }, []);

  return (
    <ReactFlowProvider>
      <div className="flex w-screen h-screen bg-slate-50">
        <SaveButton
          nodes={nodes}
          edges={edges}
          onSave={handleSave}
          onError={handleError}
        />
        <ErrorNotification
          error={error}
          onClose={clearError}
        />
        <div className="flex-1 h-screen relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            deleteKeyCode="Delete"
            onKeyDown={(event) => {
              if (event.key === 'Delete') {
                const selectedNodes = nodes.filter(node => node.selected);
                selectedNodes.forEach(node => deleteNode(node.id));
              }
            }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        {selectedNode && nodes.find(n => n.id === selectedNode.id) ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onUpdateNode={updateNode}
            onBack={handleBackToNodesPanel}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </ReactFlowProvider>
  );
}