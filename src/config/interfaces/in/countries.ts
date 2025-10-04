export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  capitalInfo: {
    latlng: [number, number];
  };
  region: string;
  subregion: string;
  continents: string[];
  languages: {
    [key: string]: string;
  };
  translations: {
    [lang: string]: {
      official: string;
      common: string;
    };
  };
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  flag: string;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  coatOfArms: {
    svg?: string;
    png?: string;
  };
  population: number;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  postalCode: {
    format: string;
    regex: string;
  };
  startOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  timezones: string[];
}

interface Countries {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: Country[];
}

export default Countries;
