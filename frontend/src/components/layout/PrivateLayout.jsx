import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Search, User, LogOut, PawPrint, MessageSquare, Star, LayoutDashboard, Menu, X, Users, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function PrivateLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading } = useAuthStore();

  const [role] = useState(user?.role || (location.pathname.includes('/caregiver') ? 'caregiver' : 'owner'));

  const ownerLinks = [
    { name: 'Dashboard',              path: '/panel/owner/dashboard', icon: LayoutDashboard },
    { name: 'Buscar Cuidador',        path: '/panel/owner/buscar',    icon: Search },
    { name: 'Mis Contactos',          path: '/panel/owner/mensajes',  icon: MessageSquare },
    { name: 'Mi Perfil',              path: '/panel/owner/perfil',    icon: User },
  ];

  const caregiverLinks = [
    { name: 'Dashboard',        path: '/panel/caregiver/dashboard', icon: LayoutDashboard },
    { name: 'Mi Anuncio',       path: '/panel/caregiver/anuncio',   icon: Star },
    { name: 'Mis Contactos',    path: '/panel/caregiver/contactos', icon: Users },
    { name: 'Mi Perfil Público',path: '/panel/caregiver/perfil',    icon: User },
  ];

  const links = role === 'owner' ? ownerLinks : caregiverLinks;
  const isCaregiver = role === 'caregiver';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <PawPrint className="text-primary animate-bounce" size={36} />
          <p className="text-gray-500 text-sm font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  // Get page title from path
  const segments = location.pathname.split('/').filter(Boolean);
  const rawTitle = segments[segments.length - 1] || 'Dashboard';
  const titleMap = {
    dashboard: 'Dashboard', buscar: 'Buscar Cuidador', mensajes: 'Mis Contactos',
    perfil: 'Mi Perfil', anuncio: 'Mi Anuncio', contactos: 'Mis Contactos',
  };
  const pageTitle = titleMap[rawTitle] || rawTitle;

  return (
    <div className="flex h-screen bg-[#f7f8fa] overflow-hidden relative">

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`absolute z-30 h-full transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 flex flex-col shrink-0 bg-gray-900 text-white`}>

        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <PawPrint size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Pawners</span>
          </Link>
          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=33'}
              alt="Avatar"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/20"
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-white/50 mt-0.5">Miembro desde 2026</p>
            </div>
          </div>
          <div className={`mt-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg text-center w-full ${
            isCaregiver ? 'bg-secondary/20 text-secondary border border-secondary/30' : 'bg-primary/20 text-primary border border-primary/30'
          }`}>
            {isCaregiver ? '🐾 Panel de Cuidador' : '👤 Panel de Persona'}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 mb-3">Menú</p>
          <ul className="space-y-0.5">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.includes(item.path);
              return (
                <li key={item.name}>
                  <Link to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={17} className={isActive ? 'text-primary' : 'text-white/40 group-hover:text-white/70'} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <ChevronRight size={14} className="text-white/30" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-xl"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-bold text-gray-800 capitalize truncate">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=33'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 hidden md:block"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
