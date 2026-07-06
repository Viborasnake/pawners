import { Star, MapPin, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCaregiverStore } from '../../store/caregiverStore';
import { useAuthStore } from '../../store/authStore';

const PREDEFINED_SERVICES = {
  'paseo': 'Paseo de perros',
  'domicilio': 'Cuidado a domicilio',
  'hogar': 'Cuidado en mi hogar',
  'largos': 'Periodos largos',
  'otro': 'Otro (especificar)'
};

export default function PublicProfile() {
  const navigate = useNavigate();
  const { listing } = useCaregiverStore();
  const { user } = useAuthStore();
  const firstName = user?.fullName?.split(' ')[0] || 'Cristian';

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Vista Previa de tu Perfil</h2>
        <p className="text-gray-500">Así es como las familias de mascotas ven tu anuncio públicamente.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative">
        <div 
          className="h-48 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${listing.coverImage || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=60'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        
        <div className="px-4 md:px-8 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 mb-6 gap-4">
            <img 
              src={listing.profileImage || "https://i.pravatar.cc/150?img=33"} 
              alt="Avatar" 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover bg-white relative z-10" 
            />
            <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button className="btn-outline px-4 sm:px-6 py-2 flex-1 sm:flex-none text-sm sm:text-base">Compartir</button>
              <button onClick={() => navigate('/panel/caregiver/anuncio')} className="btn-primary flex items-center justify-center gap-2 px-4 sm:px-6 py-2 shadow-primary/30 flex-1 sm:flex-none text-sm sm:text-base">
                <Edit3 size={18} /> <span className="hidden sm:inline">Editar Anuncio</span><span className="sm:hidden">Editar</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.fullName || 'Cristian P.'}</h1>
              <p className="text-xl text-primary font-medium mb-4">Amante de los perros con patio grande</p>
              
              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-1 text-gray-600"><MapPin size={18} /> Providencia</div>
                <div className="flex items-center gap-1 text-gray-600"><Star size={18} className="text-accent fill-accent" /> 4.9 (24 reseñas)</div>
              </div>

              <h3 className="text-xl font-bold mb-3">Sobre mí</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {listing.description}
              </p>

              <h3 className="text-xl font-bold mb-3">Reseñas recientes</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-accent"><Star size={14} className="fill-accent" /><Star size={14} className="fill-accent" /><Star size={14} className="fill-accent" /><Star size={14} className="fill-accent" /><Star size={14} className="fill-accent" /></div>
                    <span className="font-bold text-sm">Familia Ramírez</span>
                    <span className="text-xs text-gray-400">Hace 1 mes</span>
                  </div>
                  <p className="text-sm text-gray-600">Cristian cuidó muy bien de Max. Nos mandó fotos todos los días y se notaba que estaba muy feliz. ¡Lo recomendamos 100%!</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-4">
                <h3 className="font-bold text-lg mb-4">Servicios y Tarifas</h3>
                
                <div className="space-y-3 mb-6">
                  {listing.services.length === 0 ? (
                    <div className="text-center py-6 px-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                      <p className="text-gray-500 text-sm">{firstName} no ha publicado servicios.</p>
                    </div>
                  ) : (
                    listing.services.map((service) => (
                      <div key={service.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">
                          {service.type === 'otro' ? service.customName : PREDEFINED_SERVICES[service.type]}
                        </span>
                        <span className="font-bold">${service.price.toLocaleString('es-CL')} <span className="text-xs font-normal text-gray-500">/{service.period}</span></span>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg mb-4 flex items-start gap-2">
                  <CheckIcon className="mt-0.5 flex-shrink-0" />
                  <span>Pawners no cobra comisión a los cuidadores. Conservarás el 100% de estas tarifas.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}
