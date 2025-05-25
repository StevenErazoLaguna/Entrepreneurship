import { MapLocation, Pet, Library, MenuItem } from '../types';

// Mock data for the campus map locations
export const mockLocations: MapLocation[] = [
  {
    id: 'assoc1',
    name: 'Asociación de Estudiantes de Ingeniería',
    type: 'association',
    description: 'Grupo estudiantil dedicado a eventos de ingeniería y networking.',
    x: 30,
    y: 40
  },
  {
    id: 'assoc2',
    name: 'Sociedad de Debate',
    type: 'association',
    description: 'Asociación para practicar habilidades de debate y oratoria.',
    x: 70,
    y: 25
  },
  {
    id: 'assoc3',
    name: 'Club de Ciencias',
    type: 'association',
    description: 'Dedicado a experimentos científicos y divulgación.',
    x: 60,
    y: 60
  },
  {
    id: 'store1',
    name: 'Librería Central',
    type: 'store',
    description: 'Venta de libros, útiles y materiales para todas las carreras.',
    x: 20,
    y: 20
  },
  {
    id: 'store2',
    name: 'Tienda de Arte',
    type: 'store',
    description: 'Materiales para diseño, arquitectura y bellas artes.',
    x: 75,
    y: 80
  },
  {
    id: 'store3',
    name: 'Tienda de Ciencias',
    type: 'store',
    description: 'Materiales para laboratorios de química, física y biología.',
    x: 15,
    y: 75
  }
];

// Mock data for libraries
export const mockLibraries: Library[] = [
  {
    id: 'lib1',
    name: 'Biblioteca Central',
    description: 'Biblioteca principal con colecciones generales.',
    location: 'Edificio Central',
    isOpen: true,
    openingHours: {
      open: '08:00',
      close: '20:00'
    },
    capacity: 300,
    currentOccupancy: 210,
    mapPosition: {
      x: 50,
      y: 50
    }
  },
  {
    id: 'lib2',
    name: 'Biblioteca de Ciencias',
    description: 'Especializada en literatura científica y técnica.',
    location: 'Facultad de Ciencias',
    isOpen: true,
    openingHours: {
      open: '09:00',
      close: '18:00'
    },
    capacity: 150,
    currentOccupancy: 65,
    mapPosition: {
      x: 35,
      y: 65
    }
  },
  {
    id: 'lib3',
    name: 'Biblioteca de Humanidades',
    description: 'Enfocada en historia, filosofía y literatura.',
    location: 'Edificio de Humanidades',
    isOpen: false,
    openingHours: {
      open: '09:00',
      close: '19:00'
    },
    capacity: 200,
    currentOccupancy: 0,
    mapPosition: {
      x: 65,
      y: 40
    }
  },
  {
    id: 'lib4',
    name: 'Sala de Estudios 24h',
    description: 'Espacio para estudio individual y grupal.',
    location: 'Centro de Estudiantes',
    isOpen: true,
    openingHours: {
      open: '00:00',
      close: '23:59'
    },
    capacity: 100,
    currentOccupancy: 92,
    mapPosition: {
      x: 25,
      y: 30
    }
  }
];

// Mock data for pets
export const mockPets: Pet[] = [
  {
    id: 'pet1',
    name: 'Luna',
    age: 2,
    breed: 'Mestizo',
    healthStatus: 'Saludable',
    description: 'Luna es una perrita muy cariñosa y juguetona. Le encanta correr y es muy buena con los niños.',
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pet2',
    name: 'Max',
    age: 3,
    breed: 'Pastor Alemán',
    healthStatus: 'En tratamiento',
    description: 'Max es un perro inteligente y leal. Está en tratamiento por una lesión en la pata pero se recupera bien.',
    imageUrl: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pet3',
    name: 'Coco',
    age: 1,
    breed: 'Beagle',
    healthStatus: 'Saludable',
    description: 'Coco es muy energético y le encanta jugar a buscar la pelota. Es perfecto para familias activas.',
    imageUrl: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pet4',
    name: 'Toby',
    age: 4,
    breed: 'Golden Retriever',
    healthStatus: 'Saludable',
    description: 'Toby es un perro tranquilo y muy bien educado. Es excelente con otros perros y niños.',
    imageUrl: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pet5',
    name: 'Nina',
    age: 2,
    breed: 'Border Collie',
    healthStatus: 'Saludable',
    description: 'Nina es extremadamente inteligente y aprende trucos con facilidad. Necesita mucho ejercicio.',
    imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pet6',
    name: 'Rocky',
    age: 5,
    breed: 'Bulldog',
    healthStatus: 'En tratamiento',
    description: 'Rocky es un perro tranquilo que adora dormir. Está en tratamiento por problemas respiratorios.',
    imageUrl: 'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Mock data for menu items
export const mockMenuItems: MenuItem[] = [
  {
    id: 'menu1',
    name: 'Ensalada César',
    description: 'Lechuga, crutones, queso parmesano y aderezo César.',
    price: 5.50,
    category: 'Ensaladas'
  },
  {
    id: 'menu2',
    name: 'Pasta Alfredo',
    description: 'Fettuccine con salsa cremosa y queso parmesano.',
    price: 7.80,
    category: 'Platos principales'
  },
  {
    id: 'menu3',
    name: 'Hamburguesa Clásica',
    description: 'Carne de res, lechuga, tomate, cebolla y mayonesa.',
    price: 6.90,
    category: 'Platos principales'
  },
  {
    id: 'menu4',
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella y albahaca.',
    price: 8.50,
    category: 'Platos principales'
  },
  {
    id: 'menu5',
    name: 'Sopa del Día',
    description: 'Preparada con ingredientes frescos del día.',
    price: 4.20,
    category: 'Sopas'
  },
  {
    id: 'menu6',
    name: 'Sandwich Vegetal',
    description: 'Pan integral, hummus, aguacate y vegetales frescos.',
    price: 5.90,
    category: 'Sándwiches'
  },
  {
    id: 'menu7',
    name: 'Pastel de Chocolate',
    description: 'Bizcocho de chocolate con ganache y frutos rojos.',
    price: 4.50,
    category: 'Postres'
  },
  {
    id: 'menu8',
    name: 'Agua Mineral',
    description: 'Botella de 500ml.',
    price: 1.50,
    category: 'Bebidas'
  },
  {
    id: 'menu9',
    name: 'Refresco',
    description: 'Varios sabores disponibles.',
    price: 2.00,
    category: 'Bebidas'
  },
  {
    id: 'menu10',
    name: 'Café Americano',
    description: 'Café de grano recién molido.',
    price: 1.80,
    category: 'Bebidas'
  }
];