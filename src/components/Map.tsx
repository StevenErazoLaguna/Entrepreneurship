import React, { useState } from 'react';
import { MapPin, Filter, School, BookOpen, ShoppingBag } from 'lucide-react';
import { MapFilter, MapLocation, Library } from '../types';

interface MapProps {
  locations: MapLocation[];
  activeFilter: MapFilter | null;
  onFilterChange: (filter: MapFilter | null) => void;
  selectedLocation: MapLocation | null;
  onLocationSelect: (location: MapLocation) => void;
  libraries: Library[];
}

const Map: React.FC<MapProps> = ({
  locations,
  activeFilter,
  onFilterChange,
  selectedLocation,
  onLocationSelect,
  libraries
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const filteredLocations = activeFilter 
    ? locations.filter(loc => loc.type === activeFilter)
    : locations;

  // Combine regular locations with library locations for display
  const allLocations = [
    ...filteredLocations,
    ...(activeFilter === 'library' || !activeFilter 
      ? libraries.map(lib => ({
          id: `lib-${lib.id}`,
          name: lib.name,
          type: 'library' as MapFilter,
          description: `Biblioteca - ${lib.isOpen ? 'Abierta' : 'Cerrada'}`,
          x: lib.mapPosition.x,
          y: lib.mapPosition.y
        }))
      : [])
  ];

  const getIconForType = (type: MapFilter) => {
    switch (type) {
      case 'association':
        return <School className="h-6 w-6 text-blue-600" />;
      case 'store':
        return <ShoppingBag className="h-6 w-6 text-green-600" />;
      case 'library':
        return <BookOpen className="h-6 w-6 text-amber-600" />;
      default:
        return <MapPin className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-900 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Mapa Interactivo del Campus</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange(null)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeFilter === null
                ? 'bg-indigo-900 text-white'
                : 'bg-white border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => onFilterChange('association')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
              activeFilter === 'association'
                ? 'bg-indigo-900 text-white'
                : 'bg-white border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <School className="h-4 w-4" />
            Asociaciones estudiantiles
          </button>
          <button
            onClick={() => onFilterChange('store')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
              activeFilter === 'store'
                ? 'bg-indigo-900 text-white'
                : 'bg-white border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Tiendas
          </button>
          <button
            onClick={() => onFilterChange('library')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
              activeFilter === 'library'
                ? 'bg-indigo-900 text-white'
                : 'bg-white border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Bibliotecas
          </button>
        </div>
      )}

      <div className="relative" style={{ height: '60vh' }}>
        {/* Simple campus map background */}
        <div className="absolute inset-0 bg-green-100 p-4">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Campus Central
          </div>
          <div className="absolute top-10 left-10 w-1/5 h-1/6 bg-gray-300 rounded-lg"></div>
          <div className="absolute bottom-10 right-10 w-1/5 h-1/6 bg-gray-300 rounded-lg"></div>
          <div className="absolute top-10 right-10 w-1/6 h-1/6 bg-gray-300 rounded-lg"></div>
          <div className="absolute bottom-10 left-1/4 w-1/4 h-1/6 bg-gray-300 rounded-lg"></div>
          <div className="absolute top-1/2 right-1/5 w-1/6 h-1/8 bg-gray-300 rounded-lg"></div>
          
          {/* Path lines */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1 bg-gray-400"></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1/3 bg-gray-400"></div>
          <div className="absolute top-2/3 left-1/3 w-1/3 h-1 bg-gray-400"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1/3 bg-gray-400"></div>
          
          {/* Location markers */}
          {allLocations.map((location) => (
            <button
              key={location.id}
              style={{
                position: 'absolute',
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`p-1 rounded-full transition-all ${
                selectedLocation?.id === location.id 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white hover:scale-110'
              }`}
              onClick={() => onLocationSelect(location)}
            >
              {getIconForType(location.type)}
            </button>
          ))}
        </div>
      </div>

      {selectedLocation && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {getIconForType(selectedLocation.type)}
            {selectedLocation.name}
          </h3>
          <p className="text-gray-600 mt-1">{selectedLocation.description}</p>
          
          {selectedLocation.type === 'library' && (
            <div className="mt-3">
              {libraries.find(lib => `lib-${lib.id}` === selectedLocation.id) && (
                <LibraryStatus library={libraries.find(lib => `lib-${lib.id}` === selectedLocation.id)!} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const LibraryStatus: React.FC<{ library: Library }> = ({ library }) => {
  const percentOccupied = Math.round((library.currentOccupancy / library.capacity) * 100);
  
  let statusColor = 'bg-green-500';
  if (percentOccupied > 80) {
    statusColor = 'bg-red-500';
  } else if (percentOccupied > 50) {
    statusColor = 'bg-yellow-500';
  }
  
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${library.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span>{library.isOpen ? 'Abierta' : 'Cerrada'}</span>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Ocupación: {library.currentOccupancy}/{library.capacity}</span>
          <span>{percentOccupied}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${statusColor}`} 
            style={{ width: `${percentOccupied}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Map;