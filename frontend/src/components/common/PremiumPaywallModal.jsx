import { X, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PremiumPaywallModal({ isOpen, onClose, actionName = "iniciar una conversación nueva" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="relative h-32 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black/20 rounded-full p-1">
            <X size={20} />
          </button>
          <Lock className="text-white w-12 h-12" />
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Desbloquea Pawners Premium</h2>
          <p className="text-gray-600 mb-6">
            Para {actionName} necesitas actualizar tu cuenta. ¡Da el paso para encontrar a tu cuidador ideal!
          </p>
          
          <div className="space-y-3 text-left mb-8 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700"><strong>Mensajería ilimitada:</strong> Contacta a todos los cuidadores que quieras.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700"><strong>Ahorra en tarifas:</strong> Paga solo 3% de tarifa de servicio en vez de 15% al reservar.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700"><strong>Garantía 14 días:</strong> Si no estás feliz, te devolvemos tu dinero.</p>
            </div>
          </div>
          
          <Link to="/precios" onClick={onClose} className="btn-primary w-full py-3 text-lg block">
            Ver planes desde $3.067/mes
          </Link>
          <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-gray-700 font-medium">
            Quizás más tarde
          </button>
        </div>
      </div>
    </div>
  );
}
