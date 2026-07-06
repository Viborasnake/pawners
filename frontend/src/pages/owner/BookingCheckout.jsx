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
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Cover Photo */}
      <div className="h-64 w-full bg-gradient-to-r from-primary to-primary-dark relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors py-2 px-4 rounded-full text-sm font-bold flex items-center gap-2">
          &larr; Volver
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img src={caregiver.avatar} alt={caregiver.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
                <div className="text-center sm:text-left mt-2">
                  <h1 className="text-3xl font-bold text-gray-900">{caregiver.name}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-gray-600">
                    <span className="flex items-center gap-1.5 font-medium"><MapPin size={18} className="text-primary" /> {caregiver.location}</span>
                    <span className="flex items-center gap-1.5 font-medium"><Star size={18} className="text-secondary text-yellow-400 fill-current" /> {caregiver.rating} ({caregiver.reviews} reseñas)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="text-primary" /> Acerca de mí
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caregiver.about}
              </p>
            </div>

            {/* Services */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Servicios que ofrezco
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {caregiver.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <Check className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="text-primary fill-primary" /> Reseñas ({caregiver.reviews})
              </h2>
              <div className="space-y-6">
                {caregiver.reviewList.map(review => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary-dark font-bold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sidebar / Checkout (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {!isUnlocked ? (
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 border-t-4 border-t-primary">
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">Desbloquea su número</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Paga la tarifa única para obtener el WhatsApp de <strong>{caregiver.name}</strong> y coordinar los detalles del cuidado.
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-center gap-3 border border-gray-200 mb-6">
                    <Lock size={20} className="text-gray-400" />
                    <p className="font-mono text-2xl tracking-widest text-gray-500 blur-[6px] select-none">+56 9 **** ****</p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-6 mb-6">
                    <span className="font-medium text-gray-600">Tarifa de conexión</span>
                    <span className="font-bold text-2xl text-primary">${flatFee.toLocaleString('es-CL')}</span>
                  </div>

                  {!isAuthenticated ? (
                    <button 
                      onClick={() => navigate('/auth')}
                      className="w-full py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors text-lg flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                    >
                      <User size={20} /> Inicia sesión para pagar
                    </button>
                  ) : preferenceId ? (
                    <Wallet
                      initialization={initialization}
                      customization={customization}
                    />
                  ) : (
                    <button 
                      disabled={true}
                      className="w-full py-4 rounded-xl font-bold text-white bg-gray-400 cursor-not-allowed text-lg flex items-center justify-center gap-2"
                    >
                      <Clock className="animate-spin" size={20} /> Cargando medio de pago...
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-b from-green-50 to-white p-8 rounded-3xl shadow-xl border border-green-200 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">¡Desbloqueado!</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Ya puedes comunicarte directamente.
                  </p>
                  
                  <div className="bg-white border-2 border-green-100 shadow-inner rounded-2xl p-5 mb-6">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">WhatsApp</p>
                    <a href={`https://wa.me/${caregiver.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 group">
                      <Phone className="text-green-600 group-hover:scale-110 transition-transform" size={22} />
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {caregiver.phone}
                      </span>
                    </a>
                  </div>

                  <a 
                    href={`https://wa.me/${caregiver.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
                  >
                    Abrir WhatsApp
                  </a>
                  
                  <button 
                    onClick={() => navigate('/panel/owner/mensajes')}
                    className="w-full mt-4 bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Ver mis contactos
                  </button>
                </div>
              )}
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
