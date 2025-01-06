interface Review {
  author: string;
  comment: string;
  rating: number;
}


export interface MetroStation {
  name: string;
  coordinates: [number, number]; // Координаты в формате [долгота, широта]
  distance: string; // Расстояние до станции (например, "100 м")
}


export interface Pool {
  id: string;
  name: string;
  geometry: {
    coordinates: [number, number]; // Координаты в формате [долгота, широта]
  };
  properties: {
    CompanyMetaData: {
      name: string;
      address: string;
      Phones?: {
        type: string;
        formatted: string;
      }[];
      url?: string;
      Hours?: {
        text: string;
      };
      Categories: {
        name: string;
      }[];
      rating: number;
      reviews: Review[];
    };
    description: string;
  };
  services?: string[];
  images: string[];
  priceRange: {
    individual: number;
    group?: number;
    trial?: number;
  };
  metroStations?: MetroStation[]; 
}
