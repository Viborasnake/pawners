import { useState, useRef, useEffect } from 'react';
import { Award, CheckCircle2, Clock, Filter, Heart, MapPin, Search, ShieldCheck, SlidersHorizontal, Star } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

export default function SearchListings() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [service, setService] = useState('Todos los servicios');
  const [quickFilters, setQuickFilters] = useState({
    availableToday: false,
    cats: false,
    patio: false,
    featured: false,
  });
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState(0);
  const wrapperRef = useRef(null);

  const COMUNAS = [
    'Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'San Miguel', 'Viña del Mar',
    'La Florida', 'Macul', 'La Reina', 'San Joaquín', 'Vitacura', 'Maipú',
    'Peñalolén', 'Recoleta', 'Concepción', 'Antofagasta', 'La Serena', 'Temuco',
    'Valparaíso',
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
      id: 2,
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
    },
    {
      id: 3,
      name: "Camila R.",
      avatar: "https://i.pravatar.cc/150?img=47",
      comuna: "Providencia",
      rating: 4.8,
      reviews: 31,
      title: "Paseos largos y rutina activa",
      description: "Ideal para perros con mucha energia. Envio rutas, fotos y reporte breve al terminar cada paseo.",
      price: 14000,
      featured: false,
      verified: true,
      repeatFamilies: 18,
      responseTime: "Responde en 15 min",
      services: ["Paseos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Diego M.",
      avatar: "https://i.pravatar.cc/150?img=12",
      comuna: "Ñuñoa",
      rating: 4.9,
      reviews: 19,
      title: "Guarderia familiar con patio seguro",
      description: "Casa tranquila, cupos reducidos y supervision constante para perros pequenos y medianos.",
      price: 18000,
      featured: true,
      verified: true,
      repeatFamilies: 11,
      responseTime: "Responde en 35 min",
      services: ["Alojamiento", "Paseos", "Casa con patio"],
      cover: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Sofía L.",
      avatar: "https://i.pravatar.cc/150?img=32",
      comuna: "Las Condes",
      rating: 5.0,
      reviews: 27,
      title: "Cuidado premium para gatos indoor",
      description: "Visitas a domicilio, limpieza de arenero, juegos suaves y actualizaciones por WhatsApp.",
      price: 16000,
      featured: true,
      verified: true,
      repeatFamilies: 16,
      responseTime: "Responde en 25 min",
      services: ["Gatos", "Visitas", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Javiera T.",
      avatar: "https://i.pravatar.cc/150?img=49",
      comuna: "La Florida",
      rating: 4.7,
      reviews: 14,
      title: "Alojamiento con familia perruna",
      description: "Recibo un perro por vez para mantener un ambiente seguro, cercano y sin estres.",
      price: 13000,
      featured: false,
      verified: true,
      repeatFamilies: 7,
      responseTime: "Responde en 45 min",
      services: ["Alojamiento", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Felipe A.",
      avatar: "https://i.pravatar.cc/150?img=53",
      comuna: "Santiago",
      rating: 4.8,
      reviews: 22,
      title: "Visitas a domicilio en horarios flexibles",
      description: "Disponible temprano y tarde. Reviso comida, agua, medicamentos simples y compania.",
      price: 12000,
      featured: false,
      verified: true,
      repeatFamilies: 9,
      responseTime: "Responde en 30 min",
      services: ["Visitas", "Medicamentos", "Gatos"],
      cover: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Valentina C.",
      avatar: "https://i.pravatar.cc/150?img=44",
      comuna: "Macul",
      rating: 4.9,
      reviews: 17,
      title: "Cuidado carinoso para perros senior",
      description: "Experiencia con perros mayores, paseos cortos, paciencia y rutina de medicamentos.",
      price: 17000,
      featured: true,
      verified: true,
      repeatFamilies: 10,
      responseTime: "Responde en 20 min",
      services: ["Alojamiento", "Medicamentos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Ignacio B.",
      avatar: "https://i.pravatar.cc/150?img=59",
      comuna: "La Reina",
      rating: 4.6,
      reviews: 12,
      title: "Paseos tranquilos por plazas cercanas",
      description: "Trabajo con perros timidos o ansiosos, sin grupos grandes y con avances graduales.",
      price: 11000,
      featured: false,
      verified: true,
      repeatFamilies: 5,
      responseTime: "Responde en 1 hora",
      services: ["Paseos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Fernanda V.",
      avatar: "https://i.pravatar.cc/150?img=26",
      comuna: "San Joaquín",
      rating: 4.8,
      reviews: 16,
      title: "Casa segura para estadias de noche",
      description: "Ambiente familiar, patio cerrado y reportes diarios para que sepas como va todo.",
      price: 14500,
      featured: false,
      verified: true,
      repeatFamilies: 8,
      responseTime: "Responde en 40 min",
      services: ["Alojamiento", "Casa con patio", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 11,
      name: "Tomás S.",
      avatar: "https://i.pravatar.cc/150?img=60",
      comuna: "Vitacura",
      rating: 5.0,
      reviews: 9,
      title: "Cuidado uno a uno para mascotas pequenas",
      description: "Cupo unico, sin jaulas y con rutina adaptada a cada mascota.",
      price: 19000,
      featured: true,
      verified: true,
      repeatFamilies: 6,
      responseTime: "Responde en 50 min",
      services: ["Alojamiento", "Gatos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Paula N.",
      avatar: "https://i.pravatar.cc/150?img=29",
      comuna: "Maipú",
      rating: 4.7,
      reviews: 21,
      title: "Acompanamiento diario y juegos",
      description: "Me adapto a mascotas sociables, entrego fotos, videos cortos y horarios claros.",
      price: 12500,
      featured: false,
      verified: true,
      repeatFamilies: 13,
      responseTime: "Responde en 25 min",
      services: ["Visitas", "Paseos", "Fotos diarias"],
      cover: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 13,
      name: "Constanza G.",
      avatar: "https://i.pravatar.cc/150?img=25",
      comuna: "Peñalolén",
      rating: 4.9,
      reviews: 18,
      title: "Experiencia con gatos y perros timidos",
      description: "Cuidado respetuoso, tiempos de adaptacion y seguimiento cercano con fotos.",
      price: 15500,
      featured: false,
      verified: true,
      repeatFamilies: 9,
      responseTime: "Responde en 30 min",
      services: ["Gatos", "Alojamiento", "Visitas"],
      cover: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 14,
      name: "Rodrigo H.",
      avatar: "https://i.pravatar.cc/150?img=65",
      comuna: "Recoleta",
      rating: 4.6,
      reviews: 11,
      title: "Paseador con horarios de oficina",
      description: "Paseos de mediodia para perros que pasan muchas horas solos en casa.",
      price: 10000,
      featured: false,
      verified: true,
      repeatFamilies: 4,
      responseTime: "Responde en 2 horas",
      services: ["Paseos"],
      cover: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: 15,
      name: "Daniela Q.",
      avatar: "https://i.pravatar.cc/150?img=20",
      comuna: "San Miguel",
      rating: 4.9,
      reviews: 15,
      title: "Visitas y alojamiento cerca del metro",
      description: "Flexible para coordinar entregas, con experiencia en perros pequenos y gatos indoor.",
      price: 13500,
      featured: true,
      verified: true,
      repeatFamilies: 8,
      responseTime: "Responde en 18 min",
      services: ["Alojamiento", "Visitas", "Gatos"],
      cover: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=900&auto=format&fit=crop"
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
  const availableTodayIds = [1, 2, 4, 5, 7, 8, 10, 12, 15];
  const activeFilterCount = Object.values(quickFilters).filter(Boolean).length
    + (maxPrice < 20000 ? 1 : 0)
    + (minRating > 0 ? 1 : 0)
    + (service !== 'Todos los servicios' ? 1 : 0);

  const toggleQuickFilter = (key) => {
    setQuickFilters((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const resetFilters = () => {
    setQuickFilters({
      availableToday: false,
      cats: false,
      patio: false,
      featured: false,
    });
    setMaxPrice(20000);
    setMinRating(0);
    setService('Todos los servicios');
  };

  const serviceListings = listings.filter(listing =>
    service === 'Todos los servicios' || listing.services.includes(service)
  );
  const filteredListings = serviceListings.filter((listing) => {
    const acceptsCats = listing.services.includes('Gatos');
    const hasPatio = listing.services.includes('Casa con patio')
      || listing.title.toLowerCase().includes('patio')
      || listing.description.toLowerCase().includes('patio');

    return listing.price <= maxPrice
      && listing.rating >= minRating
      && (!quickFilters.availableToday || availableTodayIds.includes(listing.id))
      && (!quickFilters.cats || acceptsCats)
      && (!quickFilters.patio || hasPatio)
      && (!quickFilters.featured || listing.featured);
  });
  const hasLocationMatches = !searchTerm || filteredListings.some(listing =>
    listing.comuna.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleListings = [...filteredListings].sort((a, b) => {
    const aMatches = searchTerm && a.comuna.toLowerCase().includes(searchTerm.toLowerCase());
    const bMatches = searchTerm && b.comuna.toLowerCase().includes(searchTerm.toLowerCase());

    if (aMatches !== bMatches) return aMatches ? -1 : 1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.rating - a.rating;
  });

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
          <aside className="lg:block">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-bold text-gray-950">
                    <Filter size={18} className="text-primary-dark" />
                    Filtros
                  </div>
                  <p className="mt-1 text-xs font-medium text-gray-500">
                    {visibleListings.length} de {listings.length} cuidadores
                  </p>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 transition hover:bg-primary-light hover:text-primary-dark"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {[
                  { key: 'availableToday', label: 'Disponible hoy' },
                  { key: 'cats', label: 'Acepta gatos' },
                  { key: 'patio', label: 'Casa con patio' },
                  { key: 'featured', label: 'Cuidador destacado' },
                ].map((filter) => (
                  <label
                    key={filter.key}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                      quickFilters[filter.key]
                        ? 'border-primary bg-primary-light text-primary-dark'
                        : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:bg-gray-50'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <input
                      type="checkbox"
                      checked={quickFilters[filter.key]}
                      onChange={() => toggleQuickFilter(filter.key)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-5 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-gray-950">Precio máximo</p>
                  <p className="text-sm font-bold text-primary-dark">${maxPrice.toLocaleString('es-CL')}</p>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="20000"
                  step="1000"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="mt-3 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs font-semibold text-gray-400">
                  <span>$10.000</span>
                  <span>$20.000</span>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-sm font-bold text-gray-950">Rating mínimo</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Todos', value: 0 },
                    { label: '4.7+', value: 4.7 },
                    { label: '4.9+', value: 4.9 },
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setMinRating(option.value)}
                      className={`rounded-xl border px-2 py-2 text-xs font-bold transition ${
                        minRating === option.value
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 text-gray-600 hover:border-primary/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-primary-light p-4">
                <p className="text-sm font-bold text-gray-950">Tip Pawners</p>
                <p className="mt-1 text-sm text-gray-600">Combina precio, rating y disponibilidad para comparar perfiles sin perder buenas alternativas cercanas.</p>
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

            {!hasLocationMatches && searchTerm && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl mb-6">
                <h3 className="font-bold flex items-center gap-2"><MapPin size={18} /> No encontramos cuidadores en "{searchTerm}"</h3>
                <p className="text-sm mt-1">Te mostramos alternativas destacadas mientras ampliamos cobertura en esa comuna.</p>
              </div>
            )}

            {visibleListings.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold text-gray-950">No hay perfiles con esos filtros</h3>
                <p className="mt-1 text-sm text-gray-500">Prueba subir el precio máximo o limpiar filtros para ver más cuidadores.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-dark"
                >
                  Limpiar filtros
                </button>
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
