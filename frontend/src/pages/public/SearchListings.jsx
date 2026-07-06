import { useState, useRef, useEffect } from 'react';
import { Award, CheckCircle2, Clock, Filter, Heart, MapPin, Search, ShieldCheck, SlidersHorizontal, Star } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

export default function SearchListings() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [service, setService] = useState('Todos los servicios');
  const wrapperRef = useRef(null);

  const COMUNAS = [
    'Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'San Miguel', 'Viña del Mar',
    'Concepción', 'Antofagasta', 'La Serena', 'Temuco', 'Valparaíso',
  ];

  const [listings] = useState([
    {
      id: 1,
      name: "María J.",
      avatar: "https://i.pravatar.cc/150?img=1",
      comuna: "San Miguel",
      rating: 4.9,
      reviews: 24,
      title: "Amante de los perros con patio grande",
      description: "Casa con patio cerrado, fotos durante el cuidado y paseos en parques cercanos.",
      price: 15000,
      featured: true,
      verified: true,
      repeatFamilies: 12,
      responseTime: "Responde en 20 min",
      services: ["Alojamiento", "Paseos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Ana P.",
      avatar: "https://i.pravatar.cc/150?img=5",
      comuna: "San Miguel",
      rating: 5.0,
      reviews: 8,
      title: "Cuidados especiales para gatos",
      description: "Ambiente tranquilo, experiencia con mascotas mayores y administración de medicamentos.",
      price: 10000,
      featured: true,
      verified: true,
      repeatFamilies: 6,
      responseTime: "Responde en 1 hora",
      services: ["Gatos", "Medicamentos", "Visitas"],
      cover: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=900&auto=format&fit=crop"
    }
  ]);

  // Cierra las sugerencias si el usuario hace clic fuera del buscador
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = COMUNAS.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredListings = listings.filter(listing => 
    (searchTerm === '' || listing.comuna.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (service === 'Todos los servicios' || listing.services.includes(service))
  );
  const visibleListings = filteredListings.length > 0 ? filteredListings : listings;

  const handleSuggestionClick = (comuna) => {
    setSearchTerm(comuna);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#f6f8f7] pb-16">
      <section className="border-b border-gray-200 bg-[#f6f8f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(520px,1.2fr)] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-xs font-bold text-primary-dark">
                  <ShieldCheck size={14} />
                  Cuidadores verificados en Chile
                </p>
                <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-950 sm:text-3xl">
                  Encuentra cuidado cerca de tu casa.
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                  Compara disponibilidad, reseñas y precios antes de contactar.
                </p>
              </div>

              <div className="relative z-40 rounded-2xl border border-gray-200 bg-gray-50 p-3">
                <div className="grid gap-3 lg:grid-cols-[1fr_210px_124px]">
              <div className="relative" ref={wrapperRef}>
                <MapPin size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Comuna, ciudad o barrio"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary-light"
                />

                {showSuggestions && searchTerm && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                    {suggestions.map(comuna => (
                      <li
                        key={comuna}
                        onClick={() => handleSuggestionClick(comuna)}
                        className="px-4 py-3 hover:bg-primary-light/60 cursor-pointer text-gray-700 flex items-center gap-2 text-sm font-medium"
                      >
                        <MapPin size={16} className="text-primary-dark" /> {comuna}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary-light"
                >
                  <option>Todos los servicios</option>
                  <option>Alojamiento</option>
                  <option>Paseos</option>
                  <option>Gatos</option>
                  <option>Visitas</option>
                </select>
              </div>

              <button className="h-12 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm shadow-primary/20 transition hover:bg-primary-dark flex items-center justify-center gap-2">
                <Search size={18} /> Buscar
              </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                  {[
                    { icon: ShieldCheck, label: 'Identidad verificada' },
                    { icon: Star, label: 'Reseñas reales' },
                    { icon: Clock, label: 'Respuesta rápida' },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 font-semibold shadow-sm ring-1 ring-gray-200">
                      <Icon size={13} className="text-primary-dark" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-gray-950 font-bold mb-4">
                <Filter size={18} className="text-primary-dark" />
                Filtros rápidos
              </div>
              <div className="space-y-3">
                {['Disponible hoy', 'Acepta gatos', 'Casa con patio', 'Cuidador destacado'].map((filter) => (
                  <label key={filter} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span>{filter}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-primary-light p-4">
                <p className="text-sm font-bold text-gray-950">Tip Pawners</p>
                <p className="mt-1 text-sm text-gray-600">Guarda 2 o 3 perfiles favoritos antes de decidir. Las mejores reservas suelen cerrarse más rápido.</p>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">Cuidadores destacados cerca de ti</h2>
                <p className="text-sm text-gray-500 mt-1">Ordenados por reputación, respuesta y coincidencia con tu búsqueda.</p>
              </div>
              <span className="text-sm font-semibold text-gray-600">{visibleListings.length} resultados</span>
            </div>

            {filteredListings.length === 0 && searchTerm && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl mb-6">
                <h3 className="font-bold flex items-center gap-2"><MapPin size={18} /> No encontramos cuidadores en "{searchTerm}"</h3>
                <p className="text-sm mt-1">Te mostramos alternativas destacadas mientras ampliamos cobertura en esa comuna.</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visibleListings.map(listing => (
                <article key={listing.id} className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  <div className="h-44 bg-gray-200 relative overflow-hidden">
                    <img src={listing.cover} alt={`Mascota cuidada por ${listing.name}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                      {listing.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white shadow">
                          <Award size={13} /> Destacado
                        </span>
                      )}
                      <button className="ml-auto h-9 w-9 rounded-full bg-white/90 text-gray-500 shadow-sm transition hover:text-red-500" aria-label="Guardar favorito">
                        <Heart size={18} className="mx-auto" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 relative">
                    <img
                      src={listing.avatar}
                      alt={listing.name}
                      className="w-16 h-16 rounded-2xl border-4 border-white absolute -top-8 left-5 object-cover shadow-md"
                    />
                    <div className="flex justify-between items-start mt-7 mb-2 gap-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-950">{listing.name}</h3>
                        <div className="mt-1 flex items-center gap-1.5 text-gray-500 text-sm">
                          <MapPin size={14} /> {listing.comuna}
                        </div>
                      </div>
                      <div className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-bold text-gray-800 flex items-center gap-1">
                        <Star size={15} className="text-accent fill-accent" />
                        {listing.rating} <span className="font-medium text-gray-500">({listing.reviews})</span>
                      </div>
                    </div>

                    <p className="font-semibold text-gray-900 mb-2">{listing.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{listing.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {listing.services.map(item => (
                        <span key={item} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">{item}</span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary-dark" /> Verificado</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary-dark" /> {listing.responseTime}</span>
                    </div>

                    <div className="mt-5 flex justify-between items-center pt-4 border-t border-gray-100">
                      <p className="font-bold text-xl text-primary-dark">${listing.price.toLocaleString('es-CL')} <span className="text-xs text-gray-500 font-normal">/ noche</span></p>
                      <Link to="/checkout/reserva" className="rounded-lg bg-gray-950 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-primary-dark">
                        Ver perfil
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
