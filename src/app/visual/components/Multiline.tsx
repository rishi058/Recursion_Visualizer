import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface MultilineNodeData {
  label: string;
}

const MultilineNode: React.FC<NodeProps<MultilineNodeData>> = ({ data, selected }) => {
  // Split the label into an array of lines
  const lines = data.label.split('\n');

  return (
    <div className={`min-w-[60px] min-h-[60px] p-3 flex items-center justify-center rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface transition-shadow ${selected ? 'shadow-[0_0_8px_rgba(173,198,255,0.8)] border-primary' : 'hover:shadow-[0_0_8px_rgba(173,198,255,0.4)]'}`}>
      <Handle type="target" position={Position.Top} className="!bg-outline-variant" />
      <div className="text-center font-mono text-label-sm">
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-outline-variant" />
    </div>
  );
};

export default MultilineNode;