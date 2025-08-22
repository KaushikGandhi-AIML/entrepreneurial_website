import React from 'react';
import { getBezierPath } from '@xyflow/react';

const FloatingConnectionLine = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}: any) => {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#8b5cf6"
        strokeWidth={2}
        className="animated"
        d={edgePath}
        style={{
          strokeDasharray: '5,5',
          animation: 'dashdraw 0.5s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes dashdraw {
            from {
              stroke-dashoffset: 10;
            }
          }
        `}
      </style>
    </g>
  );
};

export default FloatingConnectionLine;
