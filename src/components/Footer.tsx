import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Escuela Politecnica Nacional</h3>
            <p className="text-indigo-200 text-sm">
              Educación de calidad para las futuras generaciones.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-indigo-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Mapa del Campus
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Comedor
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Bibliotecas
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Adopción de Perros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Facultades</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Sistemas
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Petroleos
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Quimica
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Ambiental
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Civil
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-indigo-200">
                  Av. Universidad 1234, Ciudad Universitaria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <span className="text-indigo-200">+123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:info@universidadcentral.edu" className="text-indigo-200 hover:text-white transition-colors">
                  info@epn.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-900 mt-8 pt-6 text-center text-indigo-300 text-sm">
          <p>&copy; {new Date().getFullYear()} EPN. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;