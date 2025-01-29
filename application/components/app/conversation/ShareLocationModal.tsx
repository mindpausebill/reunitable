import { Modal } from '@/components/shared/Modal';
import { getReverseLookupClient } from '@/lib/getReverseLookupClient';
import { LocationCoords, useGeolocation } from '@/lib/hooks/useGeolocation';
import { LocationJSON } from '@/types/location';
import _ from 'lodash';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ShareLocationType {
  geoLocation: LocationCoords;
  reverseLookup?: LocationJSON;
}

interface ShareLocationModalProps {
  shareOpen: boolean;
  handleShareConfirmed: (sharedLocation: ShareLocationType) => void;
  handleShareCancelled: () => void;
}

export const ShareLocationModal: React.FC<ShareLocationModalProps> = ({
  shareOpen,
  handleShareConfirmed,
  handleShareCancelled
}) => {
  const [shareLocation, setShareLocation] = useState<boolean>(shareOpen);
  const [currentLocation, setCurrentLocation] = useState<ShareLocationType | null>(null);
  const geoLocation = useGeolocation(
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 12000
    },
    shareLocation
  );

  useEffect(() => {
    setShareLocation(shareOpen);
  }, [shareOpen]);

  const reverseLookup = async (lat: number, lon: number) => {
    return await getReverseLookupClient().reverse({ lat, lon });
  };

  const throttledReverseLookup = _.throttle(reverseLookup, 30000, { trailing: false });

  useEffect(() => {
    const updateLocation = async () => {
      if (geoLocation) {
        const lat = geoLocation?.latitude;
        const lon = geoLocation?.longitude;
        if (lat && lon) {
          const location = await throttledReverseLookup(lat, lon);
          setCurrentLocation({ geoLocation, reverseLookup: location });
        }
      } else {
        setCurrentLocation(null);
      }
    };
    updateLocation();
  }, [geoLocation]);

  const handleShareButtonClicked = () => {
    if (!currentLocation) {
      handleShareCancelled();
    } else {
      handleShareConfirmed(currentLocation);
    }
  };

  return (
    <Modal
      title="Share Location"
      colorClass="bg-error-dark"
      buttonActionText="Share Location"
      iconComponent={<MapPin />}
      isOpen={shareOpen}
      onButtonClicked={handleShareButtonClicked}
      onCancelClicked={handleShareCancelled}
    >
      {!currentLocation && <p>Waiting for location.....</p>}
      {currentLocation && (
        <div>
          <p>Are you sure you want to share your current location?</p>
          <p>
            {currentLocation?.reverseLookup?.display_name ??
              `[${currentLocation?.geoLocation?.latitude},${currentLocation?.geoLocation?.longitude}]`}
          </p>
        </div>
      )}
    </Modal>
  );
};
