import { ScannedOverlay } from '../ScannedOverlay';
import { Activate } from './Activate';
import { User } from '@/types/supabaseTypes';

interface ActivateAuthenticatedPageProps {
  tagOwner: User;
  user: User;
}

const ActivateAuthenticatedPage = ({ tagOwner, user }: ActivateAuthenticatedPageProps) => {
  return (
    <ScannedOverlay
      title={`Hi, ${tagOwner.firstName}!`}
      text="Welcome to Reunitable.  You are now logged in!  Click the button below to register your new unique tags and start protecting your loved possessions"
    >
      <Activate user={user} />
    </ScannedOverlay>
  );
};

export default ActivateAuthenticatedPage;
