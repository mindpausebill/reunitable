import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  padding?: string;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  maxWidth = 'max-w-8xl',
  padding = 'px-3 md:px-6'
}) => {
  return <div className={`relative mx-auto w-full ${className} ${maxWidth} ${padding}`}>{children}</div>;
};

export default Container;
