import React, { useState } from 'react';
import { Search, Clock, MapPin, BookOpen } from 'lucide-react';
import { Library } from '../types';

interface LibrariesProps {
  libraries: Library[];
  onLibrarySelect: (location: any) => void;
}

const Libraries: React.FC<LibrariesProps> = ({ libraries, onLibrarySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLibraries = libraries.filter(
    library => library.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectLibrary = (library: Library) => {
    onLibrarySelect({
      id: `lib-${library.id}`,
      name: library.name,
      type: 'library',
      description: `Biblioteca - ${library.isOpen ? 'Abierta' : 'Cerrada'}`,
      x: library.mapPosition.x,
      y: library.mapPosition.y
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-amber-600 text-white">
        <h2 className="text-xl font-bold">Bibliotecas</h2>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Buscar biblioteca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {filteredLibraries.length > 0 ? (
          filteredLibraries.map((library) => (
            <div 
              key={library.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleSelectLibrary(library)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{library.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{library.description}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {library.isOpen ? (
                          <span>
                            Abierta • {library.openingHours.open} - {library.openingHours.close}
                          </span>
                        ) : (
                          <span className="text-red-500">Cerrada</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{library.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getOccupancyClass(library.currentOccupancy, library.capacity)
                  }`}>
                    {getOccupancyText(library.currentOccupancy, library.capacity)}
                  </div>
                  
                  <div className="mt-2 text-sm">
                    {library.currentOccupancy}/{library.capacity} asientos
                  </div>
                </div>
              </div>
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${getOccupancyBarColor(library.currentOccupancy, library.capacity)}`} 
                  style={{ width: `${(library.currentOccupancy / library.capacity) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button 
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLibrary(library);
                  }}
                >
                  <MapPin className="h-4 w-4" />
                  Ver en el mapa
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p>No se encontraron bibliotecas con ese nombre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getOccupancyClass = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return 'bg-red-100 text-red-800';
  if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

const getOccupancyBarColor = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getOccupancyText = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return 'Lleno';
  if (percentage >= 70) return 'Ocupado';
  return 'Disponible';
};

export default Libraries;