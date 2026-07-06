import { Check, ShieldAlert, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();

  const handleFreeClick = () => {
    navigate('/auth?mode=register&role=owner');
  };

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-light text-primary-dark font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider text-sm">
            Para Personas y Familias
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Paga solo cuando conectas</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sin suscripciones mensuales. Explora, revisa y compara gratis. Paga una pequeña tarifa única solo cuando estés listo para contactar.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 flex flex-col md:flex-row">
          
          <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 flex-1 flex flex-col justify-center bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuenta de Persona</h2>
            <p className="text-gray-500 mb-6">Acceso total a la plataforma</p>
            <p className="text-5xl font-bold mb-8">Gratis</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span>Ver perfiles y ubicaciones</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span>Leer reseñas de otros usuarios</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span>Sin costos de mantenimiento</span></li>
            </ul>
            <button onClick={handleFreeClick} className="w-full btn-outline mt-auto py-3">Crear Cuenta Gratis</button>
          </div>

          <div className="p-10 flex-1 flex flex-col justify-center bg-gradient-to-b from-primary-light/20 to-white relative">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PAGO POR USO</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Desbloqueo de WhatsApp</h2>
            <p className="text-gray-500 mb-6">Tarifa plana por cada cuidador contactado</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <p className="text-5xl font-bold text-primary">$3.990</p>
              <p className="text-gray-500">/ evento</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span><span className="font-semibold">Número directo:</span> chatea por WhatsApp</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span><span className="font-semibold">Trato directo:</span> sin comisiones extra</span></li>
              <li className="flex items-center gap-3"><Check className="text-green-500 flex-shrink-0" /> <span>Contacto para siempre con el cuidador</span></li>
            </ul>
            <button onClick={() => navigate('/buscar')} className="w-full btn-primary py-3">Buscar Cuidadores</button>
          </div>

        </div>
        
        {/* Caregiver Banner */}
        <div className="bg-secondary-light/30 border border-secondary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="bg-secondary text-white p-4 rounded-full flex-shrink-0 shadow-md">
              <Star size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-1">¿Eres Cuidador de Mascotas?</h3>
              <p className="text-gray-700">Para ti, crear un anuncio, aparecer en las búsquedas y recibir mensajes directos por WhatsApp es <strong className="text-secondary-dark font-extrabold">100% GRATIS</strong> para siempre. Tú cobras el 100% de tus tarifas.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/auth?mode=register&role=caregiver')}
            className="btn-secondary whitespace-nowrap text-lg px-8 py-3 w-full md:w-auto shadow-md"
          >
            Inscribirse Gratis
          </button>
        </div>
        
        {/* Protection Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <ShieldAlert className="text-blue-500 w-12 h-12 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Garantía y Seguridad</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              La tarifa de desbloqueo nos permite mantener la plataforma, verificar la identidad de los cuidadores mediante inteligencia artificial y proveer soporte en caso de inconvenientes iniciales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
