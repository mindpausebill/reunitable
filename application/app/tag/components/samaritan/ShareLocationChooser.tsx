import { ScannedOverlay } from '../ScannedOverlay';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useInsertSamaritan } from '@/lib/loaders/samaritan/useInsertSamaritan';
import { Samaritan, User } from '@/types/supabaseTypes';

interface ShareLocationChooserProps {
  tagOwner: User;
  user?: User;
  samaritan?: Samaritan | null;
  onStartChatClick: (share: boolean) => void;
  onSamaritanCleared: () => void;
}

export const ShareLocationChooser: React.FC<ShareLocationChooserProps> = ({
  tagOwner,
  onStartChatClick,
  user,
  samaritan,
  onSamaritanCleared
}) => {
  const samaritanName = user?.firstName ?? samaritan?.name;
  const title = samaritanName
    ? `Hi ${samaritanName}, you’ve just found ${tagOwner.firstName}'s lost possession!`
    : `You’ve just found ${tagOwner.firstName}'s lost possession!`;

  return (
    <ScannedOverlay
      title={title}
      text="Reunitable will help you get it back to them, click the button below to share your location and start a conversation with the owner."
    >
      <div className="flex flex-col items-center gap-6">
        {!user && samaritan?.name && (
          <button className="italic text-white underline" onClick={onSamaritanCleared}>
            ( Not {samaritan.name}? Click here )
          </button>
        )}
        <button
          className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-600"
          onClick={() => onStartChatClick(true)}
        >
          Share my location and start chat
        </button>
        <button className="font-heading text-white underline" onClick={() => onStartChatClick(false)}>
          Start chat without sharing location
        </button>
      </div>
    </ScannedOverlay>
  );
};
