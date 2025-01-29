import { ScannedOverlay } from '../ScannedOverlay';
import { User } from '@/types/supabaseTypes';
import Link from 'next/link';

interface ActivateUnauthenticatedPageProps {
  tagOwner: User;
}

const ActivateUnauthenticatedPage = ({ tagOwner }: ActivateUnauthenticatedPageProps) => {
  return (
    <ScannedOverlay
      title={`Hi, ${tagOwner.firstName}!`}
      text="Welcome to Reunitable.  To register your new tags and start protecting your possessions you will first need to log in."
    >
      <Link href={`/sign-in?redirectUrl=/tag/${(tagOwner?.metadata as { printerId?: string })?.printerId}`}>
        <div className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-600">
          Log in to activate your tags
        </div>
      </Link>
    </ScannedOverlay>
  );
};

export default ActivateUnauthenticatedPage;
