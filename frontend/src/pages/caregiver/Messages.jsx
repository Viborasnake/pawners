import { PhoneOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaregiverMessages() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <PhoneOff size={32} className="text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">No tienes familias conectadas aún</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Cuando una familia decida desbloquear tu contacto pagando la tarifa a la plataforma, aparecerán aquí sus datos de WhatsApp para que puedan coordinar.
      </p>
      <Link to="/panel/caregiver/anuncio" className="btn-primary">
        Mejorar mi anuncio
      </Link>
    </div>
  );
}
