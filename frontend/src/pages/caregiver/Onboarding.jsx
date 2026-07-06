import { useState } from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CaregiverOnboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/panel/caregiver/dashboard');
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
          <h2 className="text-2xl font-bold mb-2">¡Te damos la bienvenida!</h2>
          <p className="text-gray-600 mb-6">Para empezar a ofrecer servicios de cuidado y recibir reservas, necesitamos conocerte un poco mejor.</p>
          
          <div className="bg-primary-light/50 p-6 rounded-xl mb-6">
            <h3 className="font-bold text-primary-dark mb-2">💡 Tips para un buen perfil</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
              <li>Sube fotos claras donde se vea tu rostro y fotos con mascotas.</li>
              <li>Escribe una bio cercana contando tu experiencia.</li>
              <li>Sé realista con los precios al empezar.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sobre mí (Biografía)</label>
              <textarea className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary outline-none" placeholder="¡Hola! Soy amante de los animales y tengo 5 años de experiencia cuidando perros..."></textarea>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in">
          <h2 className="text-2xl font-bold mb-2">Tus Servicios y Tarifas</h2>
          <p className="text-gray-600 mb-6">¿Qué servicios ofreces y cuánto cobras? Tú tienes el control total de tus precios (y te quedas el 100%).</p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Alojamiento en mi casa</h4>
                <p className="text-sm text-gray-500">Cuidado por noche en tu domicilio</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-gray-500 font-medium">$</span>
                <input type="number" className="w-20 bg-transparent outline-none font-medium" placeholder="15000" />
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Paseo de perros</h4>
                <p className="text-sm text-gray-500">Paseo de 30-60 mins</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-gray-500 font-medium">$</span>
                <input type="number" className="w-20 bg-transparent outline-none font-medium" placeholder="8000" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">Comunas de cobertura</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Providencia, Ñuñoa, Las Condes" />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in">
          <h2 className="text-2xl font-bold mb-2">Verificación de Identidad</h2>
          <p className="text-gray-600 mb-6">Para garantizar la seguridad de la comunidad, requerimos que los cuidadores verifiquen su identidad antes de publicar su anuncio.</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center">
            <ShieldCheck size={48} className="text-gray-400 mb-4" />
            <h3 className="font-bold mb-2 text-gray-900">Cédula de Identidad</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">Tus datos están encriptados y jamás se comparten. Solo sirve para verificar que eres tú.</p>
            <button className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
              Subir Carnet de Identidad
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t flex justify-between">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} 
          className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
        >
          {step > 1 ? 'Atrás' : 'Cancelar'}
        </button>
        <button onClick={handleNext} className="btn-primary px-8">
          {step === 3 ? 'Publicar Mi Anuncio' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}
