import { faker } from '@faker-js/faker/locale/en_GB';
import nominatim from 'nominatim-client';

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const getRandomEnglandLocation = async (client: nominatim.NominatimClient) => {
  // 50% chance of no location
  if (faker.datatype.boolean()) return { longitude: undefined, latitude: undefined, location: undefined };

  // 50% chance of random location
  const [lat, lon] = faker.location.nearbyGPSCoordinate({ origin: [52.560556, -1.470278], radius: 150 });

  // Terms of use - only 1 call per second
  console.log(`Reverse geocoding : [${lat},${lon}]`);
  await wait(1000);

  const location = await client.reverse({ lat, lon });

  return { longitude: lon, latitude: lat, location: location };
};
