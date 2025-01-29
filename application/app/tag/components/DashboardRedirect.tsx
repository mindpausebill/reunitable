import { ScannedOverlay } from './ScannedOverlay';
import Link from 'next/link';

export const DashboardRedirect = () => {
  return (
    <ScannedOverlay title={`Already Activated!`} text="You have already activated this tag!">
      <Link href={`/dashboard`}>
        <div className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-600">
          Take me to my dashboard
        </div>
      </Link>
    </ScannedOverlay>
  );
};
