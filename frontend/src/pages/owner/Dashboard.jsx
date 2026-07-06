import { Search, Unlock, UserCircle, MapPin, Star, ArrowRight, MessageCircle, PawPrint, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const TOP_CAREGIVERS = [
  {
    id: 1,
    name: 'María J.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60',
    comuna: 'Las Condes',
    rating: 4.9,
    reviews: 24,
    title: 'Amante de los perros con patio grande',
    price: 15000,
    period: 'noche',
    badge: 'Destacado',
  },
  {
    id: 2,
    name: 'Ana P.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    cover: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60',
    comuna: 'Providencia',
    rating: 5.0,
    reviews: 8,
    title: 'Cuidados especiales para gatos',
    price: 12000,
    period: 'día',
    badge: null,
  },
  {
    id: 3,
    name: 'Carlos M.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    cover: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&auto=format&fit=crop&q=60',
    comuna: 'Ñuñoa',
    rating: 4.8,
    reviews: 31,
    title: 'Paseador profesional, 3 años de exp.',
    price: 8000,
    period: 'hora',
    badge: null,
  },
];

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, unlockedCaregivers } = useAuthStore();

  const userName = user?.fullName?.split(' ')[0] || 'Familia';
  const unlockedCount = unlockedCaregivers?.length || 0;

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8">

      {/* ── Hero Banner ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1444212477490-ca407925329e?w=1200&auto=format&fit=crop&q=60"
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary/40" />
        <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-primary-light text-sm font-semibold mb-1 uppercase tracking-widest">Bienvenido de vuelta</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">¡Hola, {userName}! 🐾</h1>
            <p className="text-white/80 text-base max-w-md">
              Encuentra el cuidador ideal para tu mascota. Contacto directo, sin comisiones.
            </p>
          </div>
          <button
            onClick={() => navigate('/panel/owner/buscar')}
            className="shrink-0 flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-primary-light transition-colors shadow-sm"
          >
            <Search size={18} /> Buscar ahora
          </button>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Search,
            label: 'Buscar',
            sub: 'Encuentra cuidadores',
            color: 'text-primary',
            bg: 'bg-primary-light/40',
            border: 'hover:border-primary/30',
            path: '/panel/owner/buscar',
          },
          {
            icon: MessageCircle,
            label: 'Mis Contactos',
            sub: `${unlockedCount} desbloqueados`,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'hover:border-green-300/50',
            path: '/panel/owner/mensajes',
            badge: unlockedCount > 0 ? unlockedCount : null,
          },
          {
            icon: UserCircle,
            label: 'Mi Perfil',
            sub: 'Agrega tu mascota',
            color: 'text-violet-500',
            bg: 'bg-violet-50',
            border: 'hover:border-violet-300/50',
            path: '/panel/owner/perfil',
          },
        ].map(({ icon: Icon, label, sub, color, bg, border, path, badge }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-all ${border} group`}
          >
            <div className={`relative w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon size={22} className={color} />
              {badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
            <p className="font-bold text-gray-900 text-sm">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </button>
        ))}
      </div>

      {/* ── Featured Caregivers ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cuidadores cerca de ti</h2>
            <p className="text-sm text-gray-400">Selección de los mejor valorados</p>
          </div>
          <button
            onClick={() => navigate('/panel/owner/buscar')}
            className="flex items-center gap-1 text-primary font-semibold text-sm hover:text-primary-dark"
          >
            Ver todos <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOP_CAREGIVERS.map(c => (
            <div
              key={c.id}
              onClick={() => navigate('/checkout/reserva')}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
              {/* Cover */}
              <div className="h-32 relative overflow-hidden">
                <img src={c.cover} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {c.badge && (
                  <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {c.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 relative">
                <img src={c.avatar} alt={c.name}
                  className="w-12 h-12 rounded-full border-3 border-white absolute -top-6 left-4 object-cover shadow-md" />
                <div className="flex justify-between items-start mt-7 mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{c.name}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {c.comuna}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-xs font-bold">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> {c.rating}
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1 mb-3">{c.title}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div>
                    <span className="text-xs text-gray-400">Desde </span>
                    <span className="font-bold text-primary">${c.price.toLocaleString('es-CL')}</span>
                    <span className="text-xs text-gray-400"> /{c.period}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                    <MessageCircle size={12} /> Contactar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity / Tip ── */}
      {unlockedCount === 0 ? (
        <div className="bg-gradient-to-r from-primary-light/50 to-secondary-light/40 border border-primary/10 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <Zap size={26} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-1">¿Cómo funciona?</p>
            <p className="text-sm text-gray-600">
              Encuentra un cuidador, paga una única vez para ver su WhatsApp y coordina directamente con él. <strong>Sin comisiones extras.</strong>
            </p>
          </div>
          <button onClick={() => navigate('/panel/owner/buscar')}
            className="shrink-0 btn-primary text-sm px-5 py-2">
            Buscar
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle size={18} className="text-primary" /> Mis contactos recientes
          </h3>
          <div className="space-y-3">
            {unlockedCaregivers.slice().reverse().map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-400">Contacto desbloqueado</p>
                </div>
                <a href={`https://wa.me/${c.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                  WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
