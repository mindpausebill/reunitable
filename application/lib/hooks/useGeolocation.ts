import { useEffect, useRef, useState } from 'react';

export interface LocationCoords {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: any;
}

export const useGeolocation = (options = {}, isEnabled = true) => {
  const [state, setState] = useState<LocationCoords>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    let watchId: number;

    const onEvent = ({ coords, timestamp }: { coords: GeolocationCoordinates; timestamp: number }) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        error: null
      });
    };

    const onEventError = (error: any) => {
      setState((s) => ({
        ...s,
        loading: false,
        error
      }));
    };

    if (isEnabled && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError, optionsRef.current);

      watchId = navigator.geolocation.watchPosition(onEvent, onEventError, optionsRef.current);
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isEnabled]);

  return state;
};
