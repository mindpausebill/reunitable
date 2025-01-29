import { ScannedOverlay } from './ScannedOverlay';
import Link from 'next/link';

export const ErrorPage = () => {
  return (
    <ScannedOverlay title={`Error!`} text="This tag belongs to someone else but hasn't yet been activated">
      <Link href={`/`}>
        <div className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-600">Back to home page</div>
      </Link>
    </ScannedOverlay>
  );
};
