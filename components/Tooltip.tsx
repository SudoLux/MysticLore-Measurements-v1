
import React from 'react';

interface TooltipProps {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ visible, content, x, y }) => {
  if (!visible) {
    return null;
  }

  const style: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    transform: `translate(${x}px, ${y}px) translateX(-50%) translateY(-100%)`,
    opacity: visible ? 1 : 0,
    zIndex: 1000,
    transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
  };

  return (
    <div
      className="tooltip"
      style={style}
      role="tooltip"
    >
      {content}
    </div>
  );
};
