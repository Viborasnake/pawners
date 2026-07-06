import { Star, TrendingUp, Edit3, Plus, Eye, Lock, MessageCircle, ArrowRight, Users, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCaregiverStore } from '../../store/caregiverStore';
import { useAuthStore } from '../../store/authStore';

const MOCK_VISITORS = [
  { id: '1', avatar: 'https://i.pravatar.cc/150?img=47', name: 'S. Martínez', pets: 'Golden Retriever', commune: 'Las Condes',  viewedAt: 'Hoy, 14:32' },
  { id: '2', avatar: 'https://i.pravatar.cc/150?img=68', name: 'A. López',    pets: 'Gato Siamés',      commune: 'Providencia', viewedAt: 'Ayer, 09:15' },
  { id: '3', avatar: 'https://i.pravatar.cc/150?img=44', name: 'V. Ruiz',     pets: 'Labrador',         commune: 'Ñuñoa',       viewedAt: 'Ayer, 18:50' },
];

// Mock contacts: te contactaron / tú contactaste
const MOCK_INCOMING = 2;
const MOCK_OUTGOING = 1;

export default function CaregiverDashboard() {
  const navigate = useNavigate();
  const { status, listing } = useCaregiverStore();
  const { user } = useAuthStore();

  const firstName = user?.fullName?.split(' ')[0] || 'Cuidador';
  const visitCount  = MOCK_VISITORS.length;
  const contactCount = MOCK_INCOMING + MOCK_OUTGOING;

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6">

      {/* ── Hero Banner ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        <img
          src={listing?.coverImage || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&auto=format&fit=crop&q=60'}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary/30" />
        <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-primary-light text-xs font-semibold mb-1 uppercase tracking-widest">Panel de Cuidador</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">¡Hola, {firstName}! 🐾</h1>
            <p className="text-white/70 text-sm mb-4 max-w-sm">
              {status === 'active' ? 'Tu anuncio está activo y visible para los dueños.' : 'Tu anuncio está pausado.'}
            </p>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Nivel: Nuevo Cuidador
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">
              <p className="text-3xl font-bold text-white">{visitCount}</p>
              <p className="text-xs text-primary-light uppercase tracking-wider font-semibold mt-1">Visitas</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">
              <p className="text-3xl font-bold text-white">{contactCount}</p>
              <p className="text-xs text-primary-light uppercase tracking-wider font-semibold mt-1">Contactos</p>
              {contactCount > 0 && (
                <p className="text-[10px] text-white/60 mt-0.5">
                  {MOCK_INCOMING} recibidos · {MOCK_OUTGOING} enviados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* ── My Listing Card ── */}
        {status === 'none' ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-primary-light/30 rounded-2xl flex items-center justify-center mb-4">
              <Plus size={28} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Sin anuncio activo</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">Crea tu anuncio para empezar a ofrecer tus servicios y recibir contactos.</p>
            <button onClick={() => navigate('/panel/caregiver/anuncio')} className="btn-primary px-6">
              Crear Anuncio
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* Cover thumbnail */}
            <div
              className="h-28 relative bg-cover bg-center"
              style={{ backgroundImage: `url(${listing.coverImage || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=60'})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                {status === 'active'
                  ? <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Activo</span>
                  : <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Pausado</span>}
              </div>
            </div>

            {/* Profile info */}
            <div className="px-5 pt-0 pb-4 relative -mt-10 flex-1">
              <img
                src={listing.profileImage || user?.avatar || 'https://i.pravatar.cc/150?img=33'}
                className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover mb-2 bg-white"
                alt="Avatar"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{user?.fullName || 'Tu Nombre'}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold">5.0</span>
                    <span className="text-gray-400">(12 reseñas)</span>
                  </div>
                </div>
                {listing.services.length > 0 && !listing.services[0]?.priceNegotiable && (
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Desde</p>
                    <p className="font-bold text-primary text-lg">${listing.services[0]?.price?.toLocaleString('es-CL')}</p>
                  </div>
                )}
                {listing.services.length > 0 && listing.services[0]?.priceNegotiable && (
                  <span className="text-xs font-semibold text-primary bg-primary-light px-2 py-1 rounded-lg">A convenir</span>
                )}
              </div>

              {listing.description && (
                <p className="text-xs text-gray-500 line-clamp-2 mt-2 italic">"{listing.description}"</p>
              )}

              {/* Service chips */}
              {listing.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {listing.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-lg font-medium">
                      {s.title || s.type}
                    </span>
                  ))}
                  {listing.services.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-lg">+{listing.services.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 px-5 py-3 flex justify-between items-center bg-gray-50/50">
              <button onClick={() => navigate('/panel/caregiver/perfil')}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
                <Eye size={15} /> Ver perfil
              </button>
              <button onClick={() => navigate('/panel/caregiver/anuncio')}
                className="flex items-center gap-1.5 text-sm font-bold text-primary bg-primary-light/40 hover:bg-primary-light px-3 py-2 rounded-xl transition-colors">
                <Edit3 size={15} /> Editar
              </button>
            </div>
          </div>
        )}

        {/* ── Boost Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                <Zap size={22} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">Genera más ingresos</h3>
                <p className="text-xs text-gray-400">Destaca en las búsquedas · x3 contactos</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-5">
              Aparecerás primero en tu comuna con una insignia <strong className="text-amber-600">Destacado</strong> que llama la atención de los dueños de mascotas.
            </p>

            {/* Preview mockup */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 relative mb-2">
              <span className="absolute -top-2.5 right-3 bg-amber-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Destacado
              </span>
              <div className="flex items-center gap-3">
                <img src={listing?.profileImage || 'https://i.pravatar.cc/150?img=33'} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow" alt="" />
                <div>
                  <p className="font-bold text-sm text-gray-900 leading-tight">{user?.fullName || 'Tu Perfil'}</p>
                  <p className="text-xs text-gray-500">El primero de la lista ⭐ 5.0</p>
                </div>
              </div>
            </div>
          </div>

          <Link to="/checkout/destacar" className="btn-secondary w-full block text-center py-3 mt-4">
            Destacar Perfil
          </Link>
        </div>
      </div>

      {/* ── Recent Visitors ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-primary" />
            <h3 className="font-bold text-gray-900 text-lg">Visitantes recientes</h3>
          </div>
          <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">
            {MOCK_VISITORS.length} nuevos
          </span>
        </div>

        <div className="space-y-2">
          {MOCK_VISITORS.map((visitor) => (
            <div key={visitor.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              {/* Blurred avatar */}
              <div className="relative shrink-0">
                <img src={visitor.avatar} className="w-12 h-12 rounded-full object-cover blur-sm" alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={16} className="text-gray-600" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{visitor.name}</p>
                <p className="text-xs text-gray-500">{visitor.pets} · {visitor.commune}</p>
                <p className="text-xs text-gray-400">{visitor.viewedAt}</p>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(`/checkout/contactar-visitante?visitor=${visitor.id}`)}
                className="shrink-0 flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors whitespace-nowrap shadow-sm"
              >
                <MessageCircle size={14} /> Obtener WhatsApp
              </button>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/panel/caregiver/contactos')}
          className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary border border-gray-100 bg-white rounded-xl py-3 transition-colors">
          Ver todos mis contactos <ArrowRight size={15} />
        </button>
      </div>

    </div>
  );
}
