import { useState } from 'react';
import { Camera, CheckCircle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OwnerOnboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/panel/owner/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            {step > i ? <CheckCircle size={16} /> : i}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-in fade-in">
          <h2 className="text-2xl font-bold mb-2">¡Bienvenido a Pawners!</h2>
          <p className="text-gray-600 mb-6">Empecemos configurando tu perfil para que los cuidadores te conozcan.</p>
          
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 cursor-pointer hover:bg-gray-200 transition-colors">
              <Camera className="text-gray-400" />
            </div>
            <span className="text-sm text-primary font-medium">Subir foto de perfil</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre preferido</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" defaultValue="Cristian" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (solo visible tras reservar)</label>
              <input type="tel" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in">
          <h2 className="text-2xl font-bold mb-2">Agrega a tu primera mascota</h2>
          <p className="text-gray-600 mb-6">Cuéntanos sobre tu engreído para encontrar el match perfecto.</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="Ej: Firulais" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                <select className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary">
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
              <div className="flex gap-2">
                {['Pequeño', 'Mediano', 'Grande', 'Gigante'].map(s => (
                  <button key={s} className="flex-1 py-2 border rounded-lg text-sm hover:bg-primary-light hover:border-primary transition-colors focus:bg-primary focus:text-white focus:border-primary">{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas importantes de comportamiento</label>
              <textarea className="w-full p-2 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-primary" placeholder="Ej: Se asusta con ruidos fuertes, le encanta jugar a la pelota..."></textarea>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in text-center py-8">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Todo listo!</h2>
          <p className="text-gray-600 mb-6">Tu perfil está configurado. Ya puedes empezar a buscar al cuidador ideal para tu mascota.</p>
          
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 text-left mb-6 flex gap-3">
            <ShieldAlert size={20} className="shrink-0" />
            <p>Nota: Te pediremos verificar tu identidad oficial la primera vez que intentes realizar una reserva para mantener la comunidad segura.</p>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t flex justify-between">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} 
          className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
        >
          {step > 1 ? 'Atrás' : 'Saltar por ahora'}
        </button>
        <button onClick={handleNext} className="btn-primary px-8">
          {step === 3 ? 'Ir a mi panel' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}
