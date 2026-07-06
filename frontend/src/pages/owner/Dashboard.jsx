import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  PawPrint,
  Search,
  ShieldCheck,
  Star,
  UserCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const TOP_CAREGIVERS = [
  {
    id: 1,
    name: 'Maria J.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60',
    comuna: 'Las Condes',
    rating: 4.9,
    reviews: 24,
    title: 'Amante de los perros con patio grande',
    price: 15000,
    period: 'noche',
    badge: 'Destacado',
    response: 'Responde en 20 min',
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
    period: 'dia',
    badge: null,
    response: 'Disponible hoy',
  },
  {
    id: 3,
    name: 'Carlos M.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    cover: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&auto=format&fit=crop&q=60',
    comuna: 'Nunoa',
    rating: 4.8,
    reviews: 31,
    title: 'Paseador profesional, 3 anos de experiencia',
    price: 8000,
    period: 'hora',
    badge: null,
    response: 'Paseos manana',
  },
];

const QUICK_STATS = [
  { label: 'Contactos', value: '0', detail: 'desbloqueados', icon: MessageCircle, tone: 'text-primary-dark bg-primary-light' },
  { label: 'Favoritos', value: '3', detail: 'por revisar', icon: Heart, tone: 'text-rose-600 bg-rose-50' },
  { label: 'Reservas', value: '0', detail: 'activas', icon: CalendarCheck, tone: 'text-amber-700 bg-amber-50' },
];

const NEXT_STEPS = [
  'Busca cuidadores por comuna',
  'Compara precio, experiencia y reseñas',
  'Desbloquea WhatsApp y coordina directo',
];

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, unlockedCaregivers } = useAuthStore();

  const userName = user?.fullName?.split(' ')[0] || 'Familia';
  const unlockedCount = unlockedCaregivers?.length || 0;

  return (
    <div className="mx-auto max-w-7xl pb-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-primary-dark">Panel de persona</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">Hola, {userName}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Gestiona tus contactos y encuentra cuidadores confiables sin perder tiempo entre pantallas.
          </p>
        </div>
        <button
          onClick={() => navigate('/panel/owner/buscar')}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          <Search size={18} /> Buscar cuidador
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <section className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-xs font-bold text-primary-dark">
                    <ShieldCheck size={15} />
                    Contacto directo y verificado
                  </div>
                  <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-950">
                    Encuentra un cuidador disponible cerca de ti.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                    Filtra por comuna, revisa reseñas y desbloquea el WhatsApp solo cuando ya tengas un perfil favorito.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/panel/owner/buscar')}
                  className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-base font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark"
                >
                  <Search size={20} /> Empezar busqueda
                </button>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {NEXT_STEPS.map((step, index) => (
                  <div key={step} className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary-dark shadow-sm">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {QUICK_STATS.map(({ label, value, detail, icon: Icon, tone }) => {
                const shownValue = label === 'Contactos' ? unlockedCount : value;
                return (
                  <button
                    key={label}
                    onClick={() => navigate(label === 'Contactos' ? '/panel/owner/mensajes' : '/panel/owner/perfil')}
                    className="rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                        <Icon size={19} />
                      </span>
                      <ChevronRight size={17} className="text-gray-300" />
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-950">{shownValue}</p>
                    <p className="text-xs font-semibold text-gray-500">{label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{detail}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-primary-dark">Recomendados</p>
                <h2 className="mt-1 text-xl font-bold text-gray-950">Cuidadores cerca de ti</h2>
                <p className="mt-1 text-sm text-gray-500">Perfiles con buena respuesta y reseñas recientes.</p>
              </div>
              <button
                onClick={() => navigate('/panel/owner/buscar')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-dark transition hover:text-primary"
              >
                Ver todos <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {TOP_CAREGIVERS.map(c => (
                <article
                  key={c.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <button onClick={() => navigate('/checkout/reserva')} className="block w-full text-left">
                    <div className="relative h-32">
                      <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/46 to-transparent" />
                      {c.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow">
                          {c.badge}
                        </span>
                      )}
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="absolute bottom-0 left-4 z-10 h-14 w-14 translate-y-1/2 rounded-full border-4 border-white bg-white object-cover shadow-lg"
                      />
                    </div>
                    <div className="p-4 pt-10">
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-gray-950">{c.name}</h3>
                              <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-gray-500">
                                <MapPin size={12} /> {c.comuna}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-gray-800">
                              <Star size={13} className="fill-accent text-accent" /> {c.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 min-h-[36px] text-sm leading-snug text-gray-600">{c.title}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <Clock size={14} className="text-primary-dark" />
                        {c.response}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <p className="text-sm text-gray-500">
                          Desde <span className="text-lg font-bold text-primary-dark">${c.price.toLocaleString('es-CL')}</span>
                          <span className="text-xs"> /{c.period}</span>
                        </p>
                        <span className="rounded-lg bg-gray-950 px-3 py-2 text-xs font-bold text-white">
                          Contactar
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
                <PawPrint size={21} />
              </div>
              <div>
                <h2 className="font-bold text-gray-950">Tu siguiente accion</h2>
                <p className="text-sm text-gray-500">Completa el primer contacto.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { label: 'Perfil de familia listo', done: true },
                { label: 'Mascota agregada', done: false },
                { label: 'Primer cuidador contactado', done: unlockedCount > 0 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
                  <CheckCircle2 size={18} className={item.done ? 'text-primary-dark' : 'text-gray-300'} />
                  <span className={`text-sm font-semibold ${item.done ? 'text-gray-800' : 'text-gray-500'}`}>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/panel/owner/perfil')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-50"
            >
              <UserCircle size={18} /> Completar perfil
            </button>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-950">Contactos recientes</h2>
              <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold text-primary-dark">{unlockedCount}</span>
            </div>

            {unlockedCount === 0 ? (
              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-dark shadow-sm">
                  <MessageCircle size={19} />
                </div>
                <p className="mt-3 text-sm font-bold text-gray-900">Aun no tienes contactos</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Cuando desbloquees un WhatsApp, aparecera aqui para retomarlo rapido.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {unlockedCaregivers.slice().reverse().map((c, i) => (
                  <div key={`${c.name}-${i}`} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                      <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500">Contacto desbloqueado</p>
                    </div>
                    <a href={`https://wa.me/${c.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 transition hover:bg-green-100">
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
