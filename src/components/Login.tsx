import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    // In a real app, this would make an API call to validate credentials
    // For this demo, we'll just simulate a successful login
    onLogin(username);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-indigo-900 text-white text-center">
          <h2 className="text-xl font-bold">Bienvenido a EPN</h2>
          <p className="text-indigo-200 text-sm mt-1">Por favor, inicia sesión para continuar</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ingresa tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="student">Estudiante</option>
                <option value="professor">Docente</option>
                <option value="staff">Personal Administrativo</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;