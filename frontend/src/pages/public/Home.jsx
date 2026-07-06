import { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const COMUNAS = [
  'Santiago',
  'Providencia',
  'Ñuñoa',
  'Las Condes',
  'San Miguel',
  'Viña del Mar',
  'Concepción',
  'Antofagasta',
  'La Serena',
  'Temuco',
  'Valparaíso',
];

const FEATURED_CAREGIVERS = [
  {
    name: 'María J.',
    comuna: 'Providencia',
    rating: '4.9',
    reviews: 24,
    service: 'Alojamiento y paseos',
    price: '$15.000',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Ana P.',
    comuna: 'San Miguel',
    rating: '5.0',
    reviews: 8,
    service: 'Cuidado de gatos',
    price: '$10.000',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Carlos V.',
    comuna: 'Las Condes',
    rating: '4.8',
    reviews: 31,
    service: 'Paseos diarios',
    price: '$12.000',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600&auto=format&fit=crop',
  },
];

const STEPS = [
  {
    icon: Search,
    title: 'Busca por comuna',
    desc: 'Filtra cuidadores cercanos y compara servicios, precios y reseñas.',
  },
  {
    icon: ShieldCheck,
    title: 'Revisa confianza',
    desc: 'Elige perfiles verificados, con experiencia clara y reputación visible.',
  },
  {
    icon: MessageSquare,
    title: 'Coordina directo',
    desc: 'Contacta por WhatsApp y acuerda horarios, cuidados y detalles sin intermediarios.',
  },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Identidad verificada' },
  { icon: Star, label: 'Reseñas reales' },
  { icon: CalendarCheck, label: 'Disponibilidad flexible' },
  { icon: HeartHandshake, label: 'Contacto directo' },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = COMUNAS.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

  const goToSearch = (comuna = searchTerm) => {
    const value = comuna.trim();
    navigate(value ? `/buscar?q=${encodeURIComponent(value)}` : '/buscar');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToSearch();
  };

  const handleSuggestionClick = (comuna) => {
    setSearchTerm(comuna);
    setShowSuggestions(false);
    goToSearch(comuna);
  };

  return (
    <div className="w-full bg-[#f6f8f7]">
      <section className="relative min-h-[620px] overflow-hidden bg-gray-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2200&auto=format&fit=crop"
          alt="Perros paseando al aire libre"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/88 via-gray-950/62 to-gray-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f6f8f7] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur">
              <Sparkles size={16} className="text-secondary" />
              Cuidadores de mascotas cerca de ti
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Encuentra una persona de confianza para cuidar a tu mascota.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/82">
              Compara perfiles, precios y reseñas en tu comuna. Contacto directo por WhatsApp, sin agencia y sin vueltas.
            </p>

            <div className="mt-8 max-w-2xl rounded-2xl border border-white/18 bg-white p-3 shadow-2xl shadow-gray-950/20">
              <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_142px]">
                <div className="relative" ref={wrapperRef}>
                  <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="¿En qué comuna buscas?"
                    className="h-[52px] min-h-[52px] w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary-light"
                  />
                  {showSuggestions && searchTerm && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                      {suggestions.map(comuna => (
                        <li
                          key={comuna}
                          onClick={() => handleSuggestionClick(comuna)}
                          className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-light/70"
                        >
                          <MapPin size={15} className="text-primary-dark" /> {comuna}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-[52px] min-h-[52px] rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm shadow-primary/30 transition hover:bg-primary-dark flex items-center justify-center gap-2"
                >
                  <Search size={18} /> Buscar
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
                <span className="text-xs font-semibold text-gray-400">Populares</span>
                {['Providencia', 'Ñuñoa', 'Las Condes', 'San Miguel'].map(comuna => (
                  <button
                    key={comuna}
                    type="button"
                    onClick={() => handleSuggestionClick(comuna)}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-primary-light hover:text-primary-dark"
                  >
                    {comuna}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-white/16 bg-white/10 px-3 py-3 backdrop-blur">
                  <Icon size={18} className="mb-2 text-secondary" />
                  <p className="text-sm font-semibold leading-snug text-white/88">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-900/5 md:grid-cols-4">
          {[
            ['500+', 'cuidadores activos'],
            ['4.9/5', 'valoración media'],
            ['$0', 'comisión al cuidador'],
            ['100%', 'contacto directo'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-gray-50 px-5 py-4">
              <p className="text-2xl font-bold text-gray-950">{value}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-primary-dark">Perfiles destacados</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">Cuidadores populares esta semana</h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Una vista rápida de perfiles para que se sienta fácil partir, comparar y decidir.
            </p>
          </div>
          <Link to="/buscar" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark hover:text-primary">
            Ver todos <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {FEATURED_CAREGIVERS.map((caregiver) => (
            <article key={caregiver.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative h-48">
                <img src={caregiver.image} alt={caregiver.service} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm">
                  <Award size={14} className="text-accent" /> Destacado
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-950">{caregiver.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} /> {caregiver.comuna}
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-50 px-2.5 py-1 text-sm font-bold text-gray-800 flex items-center gap-1">
                    <Star size={15} className="text-accent fill-accent" />
                    {caregiver.rating}
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-800">{caregiver.service}</p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-lg font-bold text-primary-dark">{caregiver.price} <span className="text-xs font-normal text-gray-500">/ noche</span></p>
                  <span className="text-xs font-semibold text-gray-500">{caregiver.reviews} reseñas</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-primary-dark">Cómo funciona</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">Menos coordinación, más tranquilidad.</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, desc }, index) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
                  <Icon size={22} />
                </div>
                <span className="mt-5 inline-block text-xs font-black uppercase text-gray-400">Paso {index + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 text-white md:grid-cols-[1fr_0.78fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold uppercase text-white">
              <CheckCircle2 size={14} /> Gratis para cuidadores
            </p>
            <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">¿Amas a las mascotas? Convierte ese cariño en ingresos.</h2>
            <p className="mt-4 max-w-xl text-white/72">
              Publica tu perfil, define tus servicios y conserva el 100% de lo que ganes. Pawners te ayuda a aparecer frente a familias que necesitan cuidado real.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/auth?mode=register&role=caregiver" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark">
                Quiero ser cuidador <ArrowRight size={18} />
              </Link>
              <Link to="/como-funciona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white/85 transition hover:bg-white/10">
                Cómo funciona
              </Link>
            </div>
          </div>
          <div className="min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=900&auto=format&fit=crop"
              alt="Paseador con perros"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
