export type LocationJSON = {
  lat: string;
  lon: string;
  display_name: string;
  class?: string;
  type?: string;
  importance?: number;
  address: {
    road: string;
    suburb: string;
    city: string;
    municipality?: string;
    county: string;
    state: string;
    country: string;
    postcode: string;
    country_code: string;
  };
  boundingbox: string[];
  osm_id: number;
  osm_type: string;
  licence: string;
  place_id: number;
};
