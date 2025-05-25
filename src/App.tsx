import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Cafeteria from './components/Cafeteria';
import Libraries from './components/Libraries';
import Login from './components/Login';
import PetAdoption from './components/PetAdoption';
import Footer from './components/Footer';
import { MapFilter, MapLocation, Pet, Library, MenuItem } from './types';
import { mockLocations, mockPets, mockLibraries, mockMenuItems } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeSection, setActiveSection] = useState<'map' | 'cafeteria' | 'libraries' | 'pets'>('map');
  const [activeFilter, setActiveFilter] = useState<MapFilter | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleFilterChange = (filter: MapFilter | null) => {
    setActiveFilter(filter);
    setSelectedLocation(null);
  };

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isLoggedIn={isLoggedIn} 
        username={username} 
        onLogout={handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:px-6">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            {activeSection === 'map' && (
              <Map 
                locations={mockLocations} 
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                libraries={mockLibraries}
              />
            )}
            
            {activeSection === 'cafeteria' && (
              <Cafeteria menuItems={mockMenuItems} />
            )}
            
            {activeSection === 'libraries' && (
              <Libraries 
                libraries={mockLibraries}
                onLibrarySelect={handleLocationSelect}
              />
            )}
            
            {activeSection === 'pets' && (
              <PetAdoption pets={mockPets} />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;