import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface MultilineNodeData {
  label: string;
}

const MultilineNode: React.FC<NodeProps<MultilineNodeData>> = ({ data }) => {
  // Split the label into an array of lines
  const lines = data.label.split('\n');

  return (
    <div className="p-4 rounded-md bg-white border border-gray-300">
      <Handle type="target" position={Position.Top} />
      <div className="text-center">
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default MultilineNode;