import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export interface ContentBoxProps {
  className?: string;
  padding?: string;
  borderRadius?: string;
  shadow?: string;
  maxWidth?: string;
}

const ContentBox: React.FC<PropsWithChildren<ContentBoxProps>> = ({
  className,
  padding,
  borderRadius,
  shadow,
  children,
  maxWidth
}) => {
  return (
    <section
      className={clsx(
        `overflow-hidden bg-white text-alpha-dark-700 shadow-md ${className}`,
        padding ? padding : 'p-6 lg:p-9',
        borderRadius ? borderRadius : 'rounded-2xl',
        shadow ? shadow : 'shadow-xl',
        maxWidth ? maxWidth : 'w-full'
      )}
    >
      {children}
    </section>
  );
};

export default ContentBox;
