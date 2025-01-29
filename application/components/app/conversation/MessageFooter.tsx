import { ShareLocationModal, ShareLocationType } from './ShareLocationModal';
import { TakePhotoModal } from './TakePhotoModal';
import { Forward, MapPin, Camera } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface MessageFooterProps {
  onMessage: (message: string, location?: ShareLocationType) => void;
  onLocation?: (location: ShareLocationType) => void;
  onPhoto?: (photo: any) => void;
}
export const MessageFooter: React.FC<MessageFooterProps> = ({ onMessage, onLocation, onPhoto }) => {
  const [message, setMessage] = useState<string>('');
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  const handleMessageSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    onMessage(message);
    setMessage('');
  };

  const handleLocationClick = () => {
    setShareOpen(true);
  };

  const handleCameraClick = () => {
    setCameraOpen(true);
  };

  const handleShareConfirmed = (sharedLocation: ShareLocationType) => {
    if (onLocation) {
      onLocation(sharedLocation);
    }
    setShareOpen(false);
  };

  const handleShareCancelled = () => {
    setShareOpen(false);
  };

  const handlePhotoConfirmed = async (photo: any) => {
    if (onPhoto) {
      onPhoto(photo);
    }
    setCameraOpen(false);
  };

  const handlePhotoCancelled = () => {
    setCameraOpen(false);
  };

  return (
    <div className="shrink-0 border-t border-alpha-light-300 bg-alpha-light-200 p-3 lg:p-6">
      <form onSubmit={handleMessageSubmit}>
        <div className="relative grow">
          <input
            className="w-full rounded-md border border-alpha-light-300 py-3 pl-4 pr-36"
            type="text"
            placeholder="Aa"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1.5">
            <button
              type="submit"
              className="flex aspect-square w-9 items-center justify-center rounded-md bg-alpha text-white"
              title="Send message"
            >
              <Forward className="h-5 w-5" />
            </button>
            {onLocation && (
              <button
                type="button"
                onClick={handleLocationClick}
                className="flex aspect-square w-9 items-center justify-center rounded-md bg-alpha text-white"
                title="Share location"
              >
                <MapPin className="h-5 w-5" />
              </button>
            )}
            {onPhoto && (
              <button
                type="button"
                onClick={handleCameraClick}
                className="flex aspect-square w-9 items-center justify-center rounded-md bg-alpha text-white"
                title="Upload media"
              >
                <Camera className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </form>
      <ShareLocationModal
        shareOpen={shareOpen}
        handleShareConfirmed={handleShareConfirmed}
        handleShareCancelled={handleShareCancelled}
      />
      <TakePhotoModal
        cameraOpen={cameraOpen}
        handlePhotoConfirmed={handlePhotoConfirmed}
        handlePhotoCancelled={handlePhotoCancelled}
      />
    </div>
  );
};
