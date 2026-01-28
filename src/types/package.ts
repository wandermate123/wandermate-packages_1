export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  category: 'varanasi-budget' | 'varanasi-premium' | 'spiritual-triangle';
  featured?: boolean;
  highlights: string[];
  images?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  reviews?: Review[];
  faqs?: FAQ[];
  terms?: {
    cancellation?: string;
    refund?: string;
    booking?: string;
  };
  mapLocation?: {
    lat: number;
    lng: number;
    address?: string;
  };
}
