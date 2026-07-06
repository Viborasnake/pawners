import { useState, useEffect } from 'react';
import { Star, CreditCard, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

export default function CaregiverBoostCheckout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [preferenceId, setPreferenceId] = useState(null);

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
            title: 'Perfil Destacado 30 Días',
            unit_price: 3990,
            quantity: 1,
            type: 'boost_profile',
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
  }, [user]);

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-6 text-sm font-medium">
          &larr; Volver
        </button>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Destaca tu Perfil</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-primary" /> Método de pago
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Aumenta tu visibilidad. Aparecerás de los primeros en tu comuna durante 30 días.
              </p>

              <div className="mt-8">
                {preferenceId ? (
                  <Wallet
                    initialization={initialization}
                    customization={customization}
                  />
                ) : (
                  <button 
                    disabled={true}
                    className="w-full max-w-sm py-4 rounded-xl font-bold text-white bg-gray-400 cursor-not-allowed text-lg flex items-center justify-center gap-2 mx-auto"
                  >
                    <Clock className="animate-spin" size={20} /> Cargando medio de pago...
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Resumen de compra</h3>
              
              <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Star className="text-secondary w-4 h-4" /> Perfil Destacado
                  </span>
                  <span className="bg-secondary-light text-secondary-dark px-2 py-1 rounded text-xs font-bold">30 Días</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-500">${price.toLocaleString('es-CL')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-3xl text-primary">${price.toLocaleString('es-CL')}</span>
              </div>

              <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="text-green-600 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-green-800 leading-relaxed">
                  Pago seguro. Conseguirás de 3 a 5 veces más contactos por parte de familias que buscan cuidador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
