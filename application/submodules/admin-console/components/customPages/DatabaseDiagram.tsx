import ERDImage from './databaseERD.svg';
import { SVGManager } from './SVGManager';

export const DatabaseDiagram = () => {
  return (
    <>
      <div className="text-2xl">Database Diagram</div>
      <SVGManager imgSrc={ERDImage.src} />
    </>
  );
};
