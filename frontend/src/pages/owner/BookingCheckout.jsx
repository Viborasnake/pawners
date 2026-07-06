import { Phone, ShieldCheck, Lock, CheckCircle2, Star, MapPin, User, Check, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { supabase } from '../../lib/supabase';

export default function CaregiverProfile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, unlockCaregiver } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  const flatFee = 3990;

  const caregiver = {
    id: 'mock-ana-p',
    name: 'Ana P.',
    phone: '+56 9 1234 5678',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: 'San Miguel',
    rating: 5.0,
    reviews: 8,
    about: 'Hola! Soy Ana, amante de los animales con más de 5 años de experiencia cuidando mascotas. Vivo en una casa amplia con un patio seguro en San Miguel. Me aseguro de que cada mascota reciba atención personalizada, paseos diarios y mucho amor mientras sus dueños no están.',
    services: [
      'Alojamiento en casa del cuidador',
      'Paseos diarios (1 hora)',
      'Cuidados especiales para gatos',
      'Administración de medicamentos orales'
    ],
    reviewList: [
      { id: 1, author: 'Carolina M.', date: 'Hace 2 semanas', text: 'Ana es maravillosa. Dejé a mi perro Toby por un fin de semana y me enviaba fotos todos los días. Se nota que ama a los animales.', rating: 5 },
      { id: 2, author: 'Sebastián V.', date: 'Hace 1 mes', text: 'Muy responsable y puntual. Mi gata Luna suele ser arisca pero con Ana se portó súper bien. La recomiendo a ojos cerrados.', rating: 5 }
    ]
  };

  const highlights = [
    { label: '5 años de experiencia', icon: ShieldCheck },
    { label: 'Responde por WhatsApp', icon: Phone },
    { label: '8 reseñas verificadas', icon: Star },
  ];

  const checkoutBenefits = [
    'Pago único por desbloquear contacto',
    'Pawners no toma comisión del cuidado',
    'Coordina fechas y condiciones directo con Ana',
  ];

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-CL' });

    const createPreference = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const res = await fetch('https://qfeykjhrsjjwfqtyptod.supabase.co/functions/v1/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            title: `Desbloqueo WhatsApp: ${caregiver.name}`,
            unit_price: flatFee,
            quantity: 1,
            type: 'unlock_contact',
            target_id: caregiver.id,
            user_id: user?.id
          })
        });
        const data = await res.json();
        if (data.id) setPreferenceId(data.id);
      } catch (error) {
        console.error('Error creating preference:', error);
      }
    };
    
    if (user) createPreference();
  }, [user, caregiver.name, caregiver.id]);

  const initialization = {
    preferenceId: preferenceId,
  };

  const customization = {
    texts: {
      action: 'pay',
      valueProp: 'security_safety'
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] pb-16 text-gray-900">
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(91,192,190,0.36),_transparent_34%),linear-gradient(135deg,_#0f172a_0%,_#134e4a_55%,_#111827_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f8f7] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/18">
            &larr; Volver
          </button>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary-dark">
                <ShieldCheck size={16} />
                Contacto seguro Pawners
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Reserva con {caregiver.name} y coordina directo por WhatsApp.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
                Revisa su perfil antes de pagar la tarifa única. Después del desbloqueo tendrás el número para acordar fechas, horarios y detalles del cuidado.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/14 bg-white/10 p-4 shadow-2xl shadow-gray-950/25 backdrop-blur lg:block">
              <div className="flex items-center gap-4">
                <img src={caregiver.avatar} alt={caregiver.name} className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-lg" />
                <div>
                  <p className="text-lg font-bold">{caregiver.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/76">
                    <MapPin size={15} className="text-primary" /> {caregiver.location}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-950/35 px-4 py-3">
                <span className="text-sm text-white/72">Tarifa de conexión</span>
                <span className="text-2xl font-bold text-white">${flatFee.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-5">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img src={caregiver.avatar} alt={caregiver.name} className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-950">{caregiver.name}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-600">
                        <span className="inline-flex items-center gap-1.5"><MapPin size={16} className="text-primary-dark" /> {caregiver.location}</span>
                        <span className="inline-flex items-center gap-1.5"><Star size={16} className="fill-accent text-accent" /> {caregiver.rating} ({caregiver.reviews} reseñas)</span>
                      </div>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-sm font-bold text-primary-dark">
                      <CheckCircle2 size={15} /> Perfil verificado
                    </span>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {highlights.map(({ label, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700">
                        <Icon size={16} className="shrink-0 text-primary-dark" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950">
                <User className="text-primary-dark" /> Acerca de Ana
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {caregiver.about}
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950">
                <CheckCircle2 className="text-primary-dark" /> Servicios incluidos
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {caregiver.services.map((service) => (
                  <div key={service} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                    <Check className="mt-0.5 shrink-0 text-primary-dark" size={18} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950">
                    <Star className="fill-accent text-accent" /> Reseñas reales
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">Comentarios de familias que ya contactaron a la cuidadora.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                  <Star size={16} className="fill-accent text-accent" />
                  {caregiver.rating} promedio
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {caregiver.reviewList.map(review => (
                  <article key={review.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-light text-sm font-bold text-secondary-dark">
                        {review.author.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-bold text-gray-950">{review.author}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{review.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6">
            {!isUnlocked ? (
              <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/8">
                <div className="border-b border-gray-100 bg-gray-950 px-5 py-5 text-white">
                  <p className="text-sm font-semibold text-primary-light">Resumen de pago</p>
                  <h3 className="mt-1 text-2xl font-bold">Desbloquea el WhatsApp</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">
                    Paga una vez para obtener el contacto de <strong className="text-white">{caregiver.name}</strong>.
                  </p>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">Número protegido</p>
                      <p className="mt-1 font-mono text-lg font-bold text-gray-500 blur-[5px] select-none">+56 9 **** ****</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-gray-100 py-5">
                    {checkoutBenefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2 text-sm font-medium text-gray-600">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary-dark" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end justify-between py-5">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Total a pagar</p>
                      <p className="mt-1 text-xs text-gray-400">Tarifa única de conexión</p>
                    </div>
                    <span className="text-3xl font-bold text-primary-dark">${flatFee.toLocaleString('es-CL')}</span>
                  </div>

                  {!isAuthenticated ? (
                    <button
                      onClick={() => navigate('/auth')}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
                    >
                      <User size={19} /> Inicia sesión para pagar
                    </button>
                  ) : preferenceId ? (
                    <Wallet
                      initialization={initialization}
                      customization={customization}
                    />
                  ) : (
                    <button
                      disabled={true}
                      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-300 px-5 py-4 text-base font-bold text-white"
                    >
                      <Clock className="animate-spin" size={19} /> Cargando medio de pago...
                    </button>
                  )}

                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-medium text-gray-500">
                    <ShieldCheck size={15} className="text-primary-dark" />
                    Tus datos de pago se procesan de forma segura.
                  </p>
                </div>
              </section>
            ) : (
              <section className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-xl shadow-green-900/10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={34} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-950">Contacto desbloqueado</h3>
                <p className="mt-2 text-sm text-gray-600">Ya puedes comunicarte directamente con {caregiver.name}.</p>

                <div className="my-6 border-y border-gray-100 py-5">
                  <p className="text-xs font-bold text-gray-400">WhatsApp</p>
                  <a href={`https://wa.me/${caregiver.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 font-bold text-gray-950 transition hover:text-green-600">
                    <Phone className="text-green-600" size={22} />
                    <span className="text-xl">{caregiver.phone}</span>
                  </a>
                </div>

                <a
                  href={`https://wa.me/${caregiver.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-[#128C7E]"
                >
                  Abrir WhatsApp
                </a>

                <button
                  onClick={() => navigate('/panel/owner/mensajes')}
                  className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Ver mis contactos
                </button>
              </section>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
