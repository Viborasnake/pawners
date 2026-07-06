import { useState } from 'react';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function SubscriptionCheckout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'monthly';
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: { title: '1 Mes', price: 9200, total: 9200 },
    quarterly: { title: '3 Meses', price: 6133, total: 18399 },
    annual: { title: '12 Meses', price: 3067, total: 36804 }
  };

  const selectedPlan = plans[planId];

  const handleTestPayment = () => {
    setIsProcessing(true);
    // Simular llamada a Mercado Pago Sandbox
    setTimeout(() => {
      setIsProcessing(false);
      alert('¡Pago de PRUEBA exitoso! Ahora eres Premium en Pawners.');
      navigate('/panel/owner/suscripcion');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-6 text-sm font-medium">
          &larr; Volver
        </button>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Completa tu actualización a Premium</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-primary" /> Método de pago (Modo Prueba)
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Esta es una integración de Sandbox para pruebas. No se procesarán cobros reales a ninguna tarjeta.
              </p>

              <div className="bg-[#009EE3]/10 border border-[#009EE3]/30 rounded-2xl p-8 text-center flex flex-col items-center">
                <img src="https://logotipoz.com/wp-content/uploads/2021/10/logo-mercado-pago-png.png" alt="Mercado Pago" className="h-10 mb-6" />
                <button 
                  onClick={handleTestPayment}
                  disabled={isProcessing}
                  className={`w-full max-w-sm py-4 rounded-xl font-bold text-white transition-colors text-lg ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#009EE3] hover:bg-[#0080B7]'}`}
                >
                  {isProcessing ? 'Procesando pago test...' : 'Pagar con Mercado Pago'}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Resumen de compra</h3>
              
              <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan Premium</span>
                  <span className="bg-secondary-light text-secondary-dark px-2 py-1 rounded text-xs font-bold">{selectedPlan.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-500">${selectedPlan.total.toLocaleString('es-CL')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-3xl text-primary">${selectedPlan.total.toLocaleString('es-CL')}</span>
              </div>

              <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="text-green-600 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-green-800 leading-relaxed">
                  Garantía de reembolso de 14 días. Puedes cancelar la renovación automática en cualquier momento desde tu panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
