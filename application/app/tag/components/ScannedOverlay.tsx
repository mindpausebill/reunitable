import FoundImage from '/public/images/founditem.svg';
import Container from '@/components/shared/Container';
import ReunitableLogo from '@/components/shared/Reunitable-logo';
import { PropsWithChildren } from 'react';

interface ScannedOverlayProps {
  title: string;
  text: string;
}

export const ScannedOverlay: React.FC<PropsWithChildren<ScannedOverlayProps>> = ({ children, title, text }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full justify-center overflow-y-auto bg-alpha-dark-600">
      <div className="absolute inset-0 bg-gradient-to-tr from-alpha to-alpha/0"></div>
      <Container
        className="relative flex flex-col items-center justify-between gap-9 pt-12 text-center"
        maxWidth="max-w-2xl"
      >
        <ReunitableLogo className="w-56 shrink-0" />

        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-4.5xl leading-tight text-white">{title}</h1>
            <p className="text-xl text-alpha-light-300">{text}</p>
          </div>
          {children}
        </div>

        <div className="w-full">
          <img className="w-full" src={FoundImage.src} alt="" />
        </div>
      </Container>
    </div>
  );
};
