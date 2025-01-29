import { getReverseLookupClient } from '@/lib/getReverseLookupClient';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { LocationJSON } from '@/types/location';
import { convertDistance, getDistance } from 'geolib';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface OwnLocationProps {
  target: [number, number];
}

export const OwnLocation: React.FC<OwnLocationProps> = ({ target }) => {
  const geolocation = useGeolocation();
  const [location, setLocation] = useState<LocationJSON | null>(null);

  useEffect(() => {
    const reverseLookup = async () => {
      if (!geolocation) {
        setLocation(null);
      }

      if (geolocation?.latitude && geolocation?.longitude) {
        setLocation(await getReverseLookupClient().reverse({ lat: geolocation.latitude, lon: geolocation.longitude }));
      }
    };
    reverseLookup();
  }, [geolocation]);

  if (!geolocation?.latitude || !geolocation?.longitude) return null;

  const distanceAway = convertDistance(
    getDistance(
      { latitude: geolocation.latitude, longitude: geolocation.longitude },
      { latitude: target[0], longitude: target[1] }
    ),
    'mi'
  );

  return (
    <div className="p-4">
      <div>
        Your location : Latitude {geolocation.latitude}, Longitude {geolocation.longitude}
      </div>
      {location?.display_name && <div>{location?.display_name}</div>}
      {distanceAway && <div>{`Approximately ${_.round(distanceAway, 1)} miles away`}</div>}
    </div>
  );
};
