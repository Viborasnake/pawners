import { useAuthStore } from '../../store/authStore';
import { MapPin, Calendar, Heart } from 'lucide-react';

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Vista Previa de tu Perfil</h2>
        <p className="text-gray-500">Así es como los cuidadores ven el perfil de tu familia cuando te contactas con ellos.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-primary to-secondary relative"></div>
        
        <div className="px-8 pb-8">
          <div className="flex justify-between items-end -mt-16 mb-6 relative z-10">
            <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" />
            <button className="btn-outline px-6 py-2">Editar Perfil</button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.firstName} {user.lastName.charAt(0)}.</h1>
            <p className="text-gray-500 flex items-center gap-2 mb-4"><MapPin size={16} /> Providencia, Santiago</p>
            
            <h3 className="text-xl font-bold mb-3 mt-8">Sobre mi familia</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
              Somos una familia de 3 que amamos salir al parque los fines de semana. Buscamos cuidadores responsables y cariñosos para nuestros peludos cuando salimos de vacaciones o tenemos días muy largos en la oficina. Nos gusta que nos manden fotos diarias.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Mascotas en la familia</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold">Max</h4>
                  <p className="text-sm text-gray-500">Perro • Golden Retriever • 3 años</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold">Luna</h4>
                  <p className="text-sm text-gray-500">Gato • Siamés • 1 año</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
