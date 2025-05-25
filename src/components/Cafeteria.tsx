import React, { useState } from 'react';
import { Clock, Users, ShoppingBag, CreditCard } from 'lucide-react';
import { MenuItem } from '../types';

interface CafeteriaProps {
  menuItems: MenuItem[];
}

const Cafeteria: React.FC<CafeteriaProps> = ({ menuItems }) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'reservation'>('menu');
  const [selectedItems, setSelectedItems] = useState<{id: string, quantity: number}[]>([]);
  const [reservationDetails, setReservationDetails] = useState({
    date: '',
    time: '',
    people: 1,
    tableType: 'individual',
  });
  const [ticketType, setTicketType] = useState<'takeaway' | 'dineIn'>('dineIn');
  const [showTicket, setShowTicket] = useState(false);
  
  const handleAddItem = (itemId: string) => {
    const existingItem = selectedItems.find(item => item.id === itemId);
    
    if (existingItem) {
      setSelectedItems(
        selectedItems.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setSelectedItems([...selectedItems, { id: itemId, quantity: 1 }]);
    }
  };
  
  const handleRemoveItem = (itemId: string) => {
    const existingItem = selectedItems.find(item => item.id === itemId);
    
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(
        selectedItems.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
    } else {
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    }
  };
  
  const getTotalPrice = () => {
    return selectedItems.reduce((total, selectedItem) => {
      const menuItem = menuItems.find(item => item.id === selectedItem.id);
      return total + (menuItem?.price || 0) * selectedItem.quantity;
    }, 0);
  };
  
  const handleGenerateTicket = () => {
    setShowTicket(true);
  };
  
  const resetOrder = () => {
    setSelectedItems([]);
    setShowTicket(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-amber-700 text-white">
        <h2 className="text-xl font-bold">Comedor Universitario</h2>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'menu'
                ? 'border-b-2 border-amber-500 text-amber-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('menu')}
          >
            Menú
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'reservation'
                ? 'border-b-2 border-amber-500 text-amber-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reservation')}
          >
            Reservar Mesa
          </button>
        </nav>
      </div>
      
      <div className="p-4">
        {activeTab === 'menu' ? (
          <div>
            {showTicket ? (
              <TicketConfirmation
                selectedItems={selectedItems}
                menuItems={menuItems}
                ticketType={ticketType}
                totalPrice={getTotalPrice()}
                onClose={resetOrder}
              />
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Menú del Día</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems.map(item => (
                      <div 
                        key={item.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="font-medium text-amber-700">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-2">
                            {selectedItems.find(si => si.id === item.id) && (
                              <>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium">
                                  {selectedItems.find(si => si.id === item.id)?.quantity || 0}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => handleAddItem(item.id)}
                              className="px-2 py-1 bg-amber-500 text-white text-sm rounded hover:bg-amber-600 transition-colors"
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedItems.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-lg mb-3">Tu Orden</h3>
                    <div className="space-y-2 mb-4">
                      {selectedItems.map(selectedItem => {
                        const menuItem = menuItems.find(item => item.id === selectedItem.id);
                        return (
                          <div key={selectedItem.id} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{menuItem?.name}</span>
                              <span className="text-gray-500 text-sm ml-2">x{selectedItem.quantity}</span>
                            </div>
                            <span>${((menuItem?.price || 0) * selectedItem.quantity).toFixed(2)}</span>
                          </div>
                        );
                      })}
                      <div className="flex justify-between items-center font-bold pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de pedido:
                      </label>
                      <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="ticketType"
                            checked={ticketType === 'dineIn'}
                            onChange={() => setTicketType('dineIn')}
                            className="text-amber-600"
                          />
                          <span>Para consumir aquí</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="ticketType"
                            checked={ticketType === 'takeaway'}
                            onChange={() => setTicketType('takeaway')}
                            className="text-amber-600"
                          />
                          <span>Para llevar</span>
                        </label>
                      </div>
                      
                      <button
                        onClick={handleGenerateTicket}
                        className="w-full py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                      >
                        Generar Ticket
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-medium text-lg mb-4">Reservar Mesa</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  value={reservationDetails.date}
                  onChange={(e) => setReservationDetails({...reservationDetails, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  id="time"
                  value={reservationDetails.time}
                  onChange={(e) => setReservationDetails({...reservationDetails, time: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de personas
                </label>
                <input
                  type="number"
                  id="people"
                  min="1"
                  max="20"
                  value={reservationDetails.people}
                  onChange={(e) => setReservationDetails({...reservationDetails, people: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de mesa
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tableType"
                      checked={reservationDetails.tableType === 'individual'}
                      onChange={() => setReservationDetails({...reservationDetails, tableType: 'individual'})}
                      className="text-amber-600"
                    />
                    <span>Individual</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tableType"
                      checked={reservationDetails.tableType === 'group'}
                      onChange={() => setReservationDetails({...reservationDetails, tableType: 'group'})}
                      className="text-amber-600"
                    />
                    <span>Grupal</span>
                  </label>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Confirmar Reserva
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const TicketConfirmation: React.FC<{
  selectedItems: {id: string, quantity: number}[];
  menuItems: MenuItem[];
  ticketType: 'takeaway' | 'dineIn';
  totalPrice: number;
  onClose: () => void;
}> = ({ selectedItems, menuItems, ticketType, totalPrice, onClose }) => {
  const ticketNumber = Math.floor(1000 + Math.random() * 9000);
  const date = new Date();
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg border-2 border-dashed border-amber-500 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-amber-600 font-bold">
          TICKET #{ticketNumber}
        </div>
        
        <div className="mb-4 text-center">
          <h3 className="font-bold text-xl">Comedor Universitario</h3>
          <p className="text-sm text-gray-500">
            {date.toLocaleDateString()} - {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        
        <div className="flex items-center justify-center mb-4 text-center">
          {ticketType === 'takeaway' ? (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <ShoppingBag size={16} />
              <span className="font-medium">Para llevar</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Users size={16} />
              <span className="font-medium">Para consumir en el lugar</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-b border-gray-200 py-3 mb-4">
          <h4 className="font-medium mb-2">Detalle de la orden:</h4>
          <ul className="space-y-2">
            {selectedItems.map(selectedItem => {
              const menuItem = menuItems.find(item => item.id === selectedItem.id);
              return (
                <li key={selectedItem.id} className="flex justify-between">
                  <div>
                    <span>{menuItem?.name}</span>
                    <span className="text-gray-500 text-sm ml-1">x{selectedItem.quantity}</span>
                  </div>
                  <span>${((menuItem?.price || 0) * selectedItem.quantity).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="text-center text-sm text-gray-500 mb-4">
          <p>¡Gracias por tu compra!</p>
          <p>Por favor presenta este ticket en la caja para pagar.</p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cafeteria;