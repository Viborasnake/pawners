import { Link } from 'react-router-dom';
import { PawPrint, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight">Pawners</span>
            </Link>
            <p className="text-gray-400">
              No somos una agencia, somos una comunidad. Conectamos familias con cuidadores de mascotas de confianza en todo Chile.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Para Familias</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/buscar" className="hover:text-primary">Buscar cuidadores</Link></li>
              <li><Link to="/como-funciona" className="hover:text-primary">Cómo funciona</Link></li>
              <li><Link to="/precios" className="hover:text-primary">Precios (Free vs Premium)</Link></li>
              <li><Link to="/confianza" className="hover:text-primary">Confianza y seguridad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Para Cuidadores</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/ganar-dinero" className="hover:text-primary">Gana dinero cuidando</Link></li>
              <li><Link to="/auth?mode=register&role=caregiver" className="hover:text-primary">Regístrate gratis</Link></li>
              <li><Link to="/normas" className="hover:text-primary">Normas de la comunidad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
              <li><Link to="/faq" className="hover:text-primary">Preguntas frecuentes</Link></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pawners SPA. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terminos" className="hover:text-white">Términos</Link>
            <Link to="/privacidad" className="hover:text-white">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
