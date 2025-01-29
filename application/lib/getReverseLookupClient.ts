import nominatim from 'nominatim-client';

const client = nominatim.createClient({
  useragent: 'Reunitable', // The name of your application
  referer: 'https://reunitable.netlify.app' // The referer link
});

export const getReverseLookupClient = () => {
  return client;
};
