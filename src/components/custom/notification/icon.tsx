import React from 'react';

type NotificationIconType = {
  rgbVarName: string;
  children: React.ReactNode;
};

const NotificationIcon: React.FC<NotificationIconType> = ({ rgbVarName, children }) => {
  const width = 40;
  const height = 40;
  const childWidth = 24;
  const childHeight = 24;

  return (
    <svg role="none" style={{ width, height }}>
      <circle cx="50%" cy="50%" fill={`rgba(var(${rgbVarName}), 0.08)`} r="20" />
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          width: childWidth,
          height: childHeight,
          x: (width - childWidth) / 2,
          y: (height - childHeight) / 2,
        })}
    </svg>
  );
};

export default NotificationIcon;
