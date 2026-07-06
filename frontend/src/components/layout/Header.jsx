import { Link } from 'react-router-dom';
import { PawPrint, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';

export default function Header() {
  const { isAuthenticated, user, role, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-gray-900 tracking-tight">Pawners</span>
          </Link>
          
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/buscar" className="text-gray-600 hover:text-primary font-medium transition-colors">Encontrar cuidador</Link>
            <Link to="/como-funciona" className="text-gray-600 hover:text-primary font-medium transition-colors">Cómo funciona</Link>
            <Link to="/precios" className="text-gray-600 hover:text-primary font-medium transition-colors">Precios</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to={`/panel/${role}/dashboard`} className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors">
                  <img src={user?.avatar || 'https://i.pravatar.cc/150?img=33'} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                  <span className="font-bold text-sm text-gray-900 line-clamp-1 max-w-[120px]">{user?.fullName || 'Mi Panel'}</span>
                </Link>
                <button onClick={() => logout()} className="text-gray-400 hover:text-red-500 transition-colors" title="Cerrar sesión">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth?mode=login" className="text-gray-600 hover:text-primary font-medium transition-colors">Iniciar sesión</Link>
                <Link to="/auth?mode=register" className="btn-primary">Regístrate gratis</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/buscar" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Encontrar cuidador</Link>
            <Link to="/como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Cómo funciona</Link>
            <Link to="/precios" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Precios</Link>
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center px-3 mb-3">
                  <img src={user?.avatar || 'https://i.pravatar.cc/150?img=33'} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                  <div className="ml-3">
                    <div className="text-base font-bold text-gray-800">{user?.fullName || 'Mi Perfil'}</div>
                  </div>
                </div>
                <Link to={`/panel/${role}/dashboard`} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Ir a mi Panel</Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-1">Cerrar sesión</button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 mt-4 flex flex-col gap-3 px-3">
                <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)} className="btn-outline w-full text-center py-2">Iniciar sesión</Link>
                <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center py-2">Regístrate gratis</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
