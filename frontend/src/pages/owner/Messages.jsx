import { PhoneOff, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function OwnerMessages() {
  const { unlockedCaregivers } = useAuthStore();

  if (!unlockedCaregivers || unlockedCaregivers.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <PhoneOff size={32} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">No tienes contactos desbloqueados</h2>
        <p className="text-gray-500 max-w-md mb-8">
          Para comunicarte con un cuidador y ver su número de teléfono/WhatsApp, primero debes buscarlo y pagar la tarifa de desbloqueo de $3.990.
        </p>
        <Link to="/panel/owner/buscar" className="btn-primary">
          Buscar Cuidadores
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Tus Contactos Desbloqueados</h2>
        <p className="text-sm text-gray-500 mt-1">Aquí puedes ver los números de teléfono por los que ya has pagado.</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {unlockedCaregivers.map((caregiver) => (
          <div key={caregiver.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <img src={caregiver.avatar} alt={caregiver.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{caregiver.name}</h3>
                <p className="text-sm text-gray-500">{caregiver.location}</p>
                <div className="mt-2 flex items-center gap-2 text-gray-700 bg-gray-100 py-1 px-3 rounded-lg w-fit">
                  <Phone size={14} className="text-primary" />
                  <span className="font-medium font-mono text-sm">{caregiver.phone}</span>
                </div>
              </div>
            </div>
            
            <a 
              href={`https://wa.me/${caregiver.phone.replace(/[^0-9]/g, '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary shrink-0 text-sm whitespace-nowrap"
            >
              Abrir WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
