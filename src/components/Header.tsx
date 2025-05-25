import React from 'react';
import { Sun } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  activeSection: 'map' | 'cafeteria' | 'libraries' | 'pets';
  setActiveSection: (section: 'map' | 'cafeteria' | 'libraries' | 'pets') => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  username,
  onLogout,
  activeSection,
  setActiveSection
}) => {
  // Simulated UV index - in a real app, this would come from an API
  const uvIndex = 6;

  const getUvClassName = (index: number): string => {
    if (index <= 2) return 'bg-green-500'; // Low
    if (index <= 5) return 'bg-yellow-400'; // Moderate
    if (index <= 7) return 'bg-orange-500'; // High
    if (index <= 10) return 'bg-red-500'; // Very High
    return 'bg-purple-700'; // Extreme
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-md">
      {/* UV Index indicator */}
      <div className="w-full py-2 flex justify-center items-center gap-2 bg-indigo-950">
        <Sun className="h-5 w-5 text-yellow-300" />
        <span className="text-sm font-medium">Índice UV actual:</span>
        <span className={`px-2 py-1 rounded-md text-xs font-bold text-white ${getUvClassName(uvIndex)}`}>
          {uvIndex}
        </span>
      </div>

      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="currentColor"
              />
              <path
                d="M2 17L12 22L22 17"
                fill="currentColor"
              />
              <path
                d="M2 12L12 17L22 12"
                fill="currentColor"
                fillOpacity="0.5"
              />
            </svg>
            <h1 className="text-xl font-bold">Escuela Politecnica Nacional</h1>
          </div>

          {isLoggedIn && (
            <div className="md:hidden">
              <button
                onClick={() => onLogout()}
                className="text-sm bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-1 md:gap-2">
              <li>
                <button
                  onClick={() => setActiveSection('map')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection === 'map'
                    ? 'bg-white text-indigo-900 font-medium'
                    : 'text-white hover:bg-indigo-800'
                    }`}
                >
                  Mapa del Campus
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('cafeteria')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection === 'cafeteria'
                    ? 'bg-white text-indigo-900 font-medium'
                    : 'text-white hover:bg-indigo-800'
                    }`}
                >
                  Comedor
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('libraries')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection === 'libraries'
                    ? 'bg-white text-indigo-900 font-medium'
                    : 'text-white hover:bg-indigo-800'
                    }`}
                >
                  Bibliotecas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('pets')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection === 'pets'
                    ? 'bg-white text-indigo-900 font-medium'
                    : 'text-white hover:bg-indigo-800'
                    }`}
                >
                  Adopción de Perros
                </button>
              </li>
            </ul>
          </nav>
        )}

        {isLoggedIn && (
          <div className="mt-4 md:mt-0 hidden md:block">
            <div className="flex items-center gap-3">
              <span className="text-sm">{username}</span>
              <button
                onClick={() => onLogout()}
                className="text-sm bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;