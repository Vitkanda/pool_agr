interface Review {
  author: string;
  comment: string;
  rating: number;
}

export interface Pool {
  id: string;
  name: string;
  coordinates: [number, number];
  district: string;
  metroStation: string;
  address: string;
  ageGroups: string[];
  priceRange: {
    individual: number;
    group: number;
    trial?: number;
  };
  description: string;
  images: string[];
  schedule: string;
  rating: number;
  reviews: Review[];
}
