import { Search, MessageSquare, ShieldCheck, CreditCard, Heart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="bg-primary-light/50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Cómo funciona Pawners</h1>
          <p className="text-xl text-gray-600">
            Conectamos a dueños de mascotas amorosos con cuidadores de confianza en todo Chile.
          </p>
        </div>
      </div>

      {/* Para Familias */}
      <div className="py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-light text-primary-dark font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider text-sm">
              Para Dueños de Mascotas
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Encuentra a tu cuidador ideal en 4 pasos</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                <Search size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Busca</h3>
              <p className="text-gray-600 text-sm">Explora perfiles en tu comuna. Revisa fotos, reseñas y tarifas de cuidadores verificados.</p>
            </div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Contacta</h3>
              <p className="text-gray-600 text-sm">Suscríbete a Premium para enviar mensajes ilimitados y resolver todas tus dudas.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                <Heart size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Conoce</h3>
              <p className="text-gray-600 text-sm">Organiza una reunión previa (Meet & Greet) gratuita para asegurar que tu mascota y el cuidador se lleven bien.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                <CreditCard size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">4. Reserva Segura</h3>
              <p className="text-gray-600 text-sm">Paga de forma segura en Pawners. El pago se libera al cuidador solo cuando el servicio finaliza con éxito.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/buscar" className="btn-primary inline-flex items-center gap-2">Buscar Cuidadores Ahora <Search size={18} /></Link>
          </div>
        </div>
      </div>

      {/* Para Cuidadores */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-secondary-light text-secondary-dark font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider text-sm">
              Para Cuidadores
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Gana dinero haciendo lo que amas</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Crear tu perfil y usar la plataforma es <strong className="text-secondary-dark">100% Gratis</strong>. No cobramos comisiones a los cuidadores.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl shadow-md">1</div>
              <h3 className="text-xl font-bold mb-3">Crea tu Anuncio</h3>
              <p className="text-gray-600">Completa tu perfil, define qué servicios ofreces (alojamiento, paseos, etc.), establece tus propias tarifas y sube fotos de tu hogar.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl shadow-md">2</div>
              <h3 className="text-xl font-bold mb-3">Recibe Solicitudes</h3>
              <p className="text-gray-600">Las familias te contactarán a través de la plataforma. Responde rápido, coordina una reunión inicial y aprueba las reservas que te acomoden.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl shadow-md">3</div>
              <h3 className="text-xl font-bold mb-3">Recibe tu Pago</h3>
              <p className="text-gray-600">Una vez finalizado el servicio de cuidado o paseo de forma exitosa, transferiremos el 100% de tus ganancias directamente a tu cuenta bancaria.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/auth?mode=register&role=caregiver" className="btn-secondary text-lg px-8 py-3">Inscribirme Gratis como Cuidador</Link>
          </div>
        </div>
      </div>

      {/* Confianza y Seguridad */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck size={48} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestra Promesa de Seguridad</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Perfiles Verificados</h4>
                <p className="text-sm text-gray-600">Revisamos la identidad de cada cuidador antes de que su anuncio sea público.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Reseñas Reales</h4>
                <p className="text-sm text-gray-600">Solo dueños que han completado reservas pueden dejar calificaciones.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Pagos Seguros</h4>
                <p className="text-sm text-gray-600">Protegemos tu dinero. Pagas hoy, el cuidador recibe los fondos al terminar el servicio.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Soporte Continuo</h4>
                <p className="text-sm text-gray-600">PetBot IA y nuestro equipo humano están listos para ayudarte en cualquier eventualidad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
