import React, { useState } from 'react';
import { Heart, Clock, Calendar, PawPrint as Paw, Gift } from 'lucide-react';
import { Pet } from '../types';

interface PetAdoptionProps {
  pets: Pet[];
}

const PetAdoption: React.FC<PetAdoptionProps> = ({ pets }) => {
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [formType, setFormType] = useState<'adopt' | 'walk' | 'donate' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    amount: 10,
    message: '',
  });
  const [submittedForm, setSubmittedForm] = useState(false);
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    setSubmittedForm(true);
  };
  
  const resetForm = () => {
    setFormType(null);
    setActivePet(null);
    setSubmittedForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      amount: 10,
      message: '',
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-purple-800 text-white">
        <h2 className="text-xl font-bold">Adopción de Perros</h2>
        <p className="text-purple-200 text-sm mt-1">Encuentra un amigo fiel para siempre</p>
      </div>
      
      {submittedForm ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Paw className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h3>
          <p className="text-gray-600 mb-6">
            {formType === 'adopt' && 'Tu solicitud de adopción ha sido recibida. Te contactaremos pronto para coordinar la visita.'}
            {formType === 'walk' && 'Tu solicitud para pasear ha sido registrada. Nos pondremos en contacto para confirmar la fecha.'}
            {formType === 'donate' && '¡Gracias por tu donación! Tu ayuda es invaluable para el cuidado de nuestros amigos peludos.'}
          </p>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Volver
          </button>
        </div>
      ) : formType ? (
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => setFormType(null)}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              ← Volver a la lista de perros
            </button>
          </div>
          
          {activePet && (
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-1/3">
                <img 
                  src={activePet.imageUrl} 
                  alt={activePet.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold">{activePet.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {activePet.age} años
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {activePet.breed}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activePet.healthStatus === 'Saludable' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activePet.healthStatus}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{activePet.description}</p>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">
              {formType === 'adopt' && 'Formulario de Adopción'}
              {formType === 'walk' && 'Solicitud para Pasear'}
              {formType === 'donate' && 'Realizar una Donación'}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              {formType === 'walk' && (
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha preferida
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              )}
              
              {formType === 'donate' && (
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Monto de la donación ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    min="1"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {formType === 'adopt' && '¿Por qué quieres adoptar?'}
                  {formType === 'walk' && 'Información adicional'}
                  {formType === 'donate' && 'Mensaje (opcional)'}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required={formType === 'adopt'}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                {formType === 'adopt' && 'Enviar Solicitud'}
                {formType === 'walk' && 'Reservar Paseo'}
                {formType === 'donate' && 'Realizar Donación'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={pet.imageUrl} 
                    alt={pet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold">{pet.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        {pet.age} años
                      </span>
                      <span className={`px-2 py-0.5 text-white text-xs rounded-full backdrop-blur-sm ${
                        pet.healthStatus === 'Saludable' 
                          ? 'bg-green-500/30' 
                          : 'bg-yellow-500/30'
                      }`}>
                        {pet.healthStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>
                  
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => {
                        setActivePet(pet);
                        setFormType('adopt');
                      }}
                      className="flex-1 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Heart className="h-4 w-4" />
                      Adoptar
                    </button>
                    <button
                      onClick={() => {
                        setActivePet(pet);
                        setFormType('walk');
                      }}
                      className="flex-1 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Clock className="h-4 w-4" />
                      Pasear
                    </button>
                    <button
                      onClick={() => {
                        setActivePet(pet);
                        setFormType('donate');
                      }}
                      className="flex-1 py-2 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Gift className="h-4 w-4" />
                      Donar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetAdoption;