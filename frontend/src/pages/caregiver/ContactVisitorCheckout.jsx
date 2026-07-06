import { useState, useEffect } from 'react';
import { Eye, CreditCard, Clock, ShieldCheck, Phone } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

// Datos simulados del visitante (en producción vendrían por ID desde la URL)
const MOCK_VISITORS = {
  '1': { id: '1', name: 'Sofía Martínez', avatar: 'https://i.pravatar.cc/150?img=47', pets: 'Golden Retriever', viewedAt: 'Hoy, 14:32' },
  '2': { id: '2', name: 'Andrés López',   avatar: 'https://i.pravatar.cc/150?img=68', pets: 'Gato Siamés',       viewedAt: 'Ayer, 09:15' },
  '3': { id: '3', name: 'Valentina Ruiz', avatar: 'https://i.pravatar.cc/150?img=44', pets: 'Labrador',          viewedAt: 'Ayer, 18:50' },
};

export default function ContactVisitorCheckout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const visitorId = searchParams.get('visitor') || '1';
  const visitor = MOCK_VISITORS[visitorId];

  const { user } = useAuthStore();
  const [preferenceId, setPreferenceId] = useState(null);
  const [paid, setPaid] = useState(false);
  const price = 3990;

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
            title: 'Contactar visitante de perfil',
            unit_price: price,
            quantity: 1,
            type: 'contact_visitor',
            user_id: user?.id,
            visitor_id: visitorId
          })
        });
        const data = await res.json();
        if (data.id) setPreferenceId(data.id);
      } catch (error) {
        console.error('Error creating preference:', error);
      }
    };

    if (user) createPreference();
  }, [user, visitorId]);

  // Simular pago exitoso en dev
  const handleSimulatePay = () => setPaid(true);

  if (paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Contacto desbloqueado!</h2>
          <p className="text-gray-500 mb-8">Ya puedes escribirle directamente a <strong>{visitor?.name}</strong>.</p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 flex items-center gap-4">
            <img src={visitor?.avatar} className="w-14 h-14 rounded-full object-cover" alt={visitor?.name} />
            <div className="text-left">
              <p className="font-bold text-gray-900">{visitor?.name}</p>
              <p className="text-sm text-gray-500">Tiene: {visitor?.pets}</p>
              <p className="text-primary font-semibold mt-1">+56 9 •••• ••••</p>
            </div>
          </div>

          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl mb-3 transition-colors"
          >
            Escribir por WhatsApp
          </a>
          <button
            onClick={() => navigate('/panel/caregiver/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-6 text-sm font-medium">
          ← Volver
        </button>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Contactar Visitante</h1>
        <p className="text-gray-500 mb-8">Esta persona visitó tu perfil. Paga para ver su número y ofrecerle tus servicios.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-primary" /> Método de pago
            </h2>

            {preferenceId ? (
              <Wallet
                initialization={{ preferenceId }}
                customization={{ texts: { action: 'pay', valueProp: 'security_safety' } }}
              />
            ) : (
              <div className="space-y-4">
                <button
                  disabled
                  className="w-full py-4 rounded-xl font-bold text-white bg-gray-300 cursor-not-allowed text-lg flex items-center justify-center gap-2"
                >
                  <Clock className="animate-spin" size={20} /> Cargando medio de pago...
                </button>
                {/* Dev shortcut */}
                <button
                  onClick={handleSimulatePay}
                  className="w-full py-3 rounded-xl font-semibold text-primary border border-primary hover:bg-primary-light/20 text-sm transition-colors"
                >
                  (Dev) Simular pago exitoso
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Resumen</h3>

              {/* Visitor blurred preview */}
              <div className="flex items-center gap-3 mb-6 bg-gray-50 rounded-2xl p-4">
                <div className="relative">
                  <img src={visitor?.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
                  <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-[2px]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{visitor?.name}</p>
                  <p className="text-xs text-gray-500">Vio tu perfil: {visitor?.viewedAt}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Tiene: {visitor?.pets}</p>
                </div>
              </div>

              <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contactar visitante</span>
                  <span className="text-gray-700 font-medium">${price.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">Total</span>
                <span className="font-bold text-2xl text-primary">${price.toLocaleString('es-CL')}</span>
              </div>

              <div className="bg-green-50 p-3 rounded-xl flex items-start gap-2">
                <ShieldCheck className="text-green-600 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-green-800 leading-relaxed">
                  Si convences al dueño de contratarte, el 100% de lo que cobres es tuyo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
