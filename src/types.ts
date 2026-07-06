export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
  bestTime: string;
  weather: string;
  duration: string;
}

export interface TourPackage {
  id: string;
  name: string;
  price: number;
  category: 'harian' | 'exclusive' | 'study_tour' | 'company_trip' | 'mobil';
  type: string;
  duration: string;
  minPax?: number;
  details: string[];
  image: string;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}
