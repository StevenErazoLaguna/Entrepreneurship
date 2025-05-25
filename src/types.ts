export type MapFilter = 'association' | 'store' | 'library';

export interface MapLocation {
  id: string;
  name: string;
  type: MapFilter;
  description: string;
  x: number; // percentage position on map (0-100)
  y: number; // percentage position on map (0-100)
}

export interface Library {
  id: string;
  name: string;
  description: string;
  location: string;
  isOpen: boolean;
  openingHours: {
    open: string;
    close: string;
  };
  capacity: number;
  currentOccupancy: number;
  mapPosition: {
    x: number; // percentage position on map (0-100)
    y: number; // percentage position on map (0-100)
  };
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  breed: string;
  healthStatus: string;
  description: string;
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}