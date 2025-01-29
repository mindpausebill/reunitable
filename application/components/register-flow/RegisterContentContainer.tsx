import Container from '../shared/Container';
import ContentBox from '@/components/shared/ContentBox';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode | undefined;
  marginTop?: string;
  title?: string;
}

export const RegisterContentContainer = ({ children, marginTop = 'mt-2', title }: Props) => {
  return (
    <Container className={`relative ${marginTop}`} maxWidth="max-w-8xl">
      {title && (
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl text-alpha-dark-600">{title}</h2>
          <hr />
        </div>
      )}
      <div className="flex flex-col gap-12">{children}</div>
    </Container>
  );
};
