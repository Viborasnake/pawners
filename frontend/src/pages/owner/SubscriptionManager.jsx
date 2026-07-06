import { Star, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubscriptionManager() {
  // Simular estado de suscripción activa
  const isPremium = false;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Mi Suscripción</h1>

      {isPremium ? (
        <>
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <Star className="absolute -right-6 -top-6 w-32 h-32 text-white/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Plan Activo</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Premium Mensual</h2>
              <p className="text-primary-light mb-8">Tu próxima facturación es el 30 de Mayo de 2026 por $9.200</p>
              
              <div className="flex gap-4">
                <button className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                  Cambiar Plan a Anual (-66%)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <h3 className="font-bold text-lg mb-6 text-gray-900">Historial de Facturación</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 font-medium text-gray-400">Fecha</th>
                    <th className="py-3 font-medium text-gray-400">Monto</th>
                    <th className="py-3 font-medium text-gray-400">Estado</th>
                    <th className="py-3 font-medium text-gray-400">Recibo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-gray-900 font-medium">30 Abr 2026</td>
                    <td className="py-4">$9.200 CLP</td>
                    <td className="py-4"><span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Pagado</span></td>
                    <td className="py-4"><button className="text-primary font-medium hover:text-primary-dark">Descargar PDF</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-red-100 rounded-3xl p-8">
            <h3 className="font-bold text-lg text-red-600 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} /> Peligro Zone: Cancelar Suscripción
            </h3>
            <p className="text-gray-600 text-sm mb-6 max-w-xl">
              Si cancelas la renovación automática, perderás el acceso a la mensajería ilimitada y tu tarifa de servicio al reservar subirá del 3% al 15% al finalizar tu periodo actual.
            </p>
            <button className="text-red-600 font-medium hover:bg-red-50 border border-red-200 px-6 py-2.5 rounded-lg transition-colors">
              Cancelar mi plan
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-10 text-center max-w-2xl mx-auto mt-12">
          <div className="bg-gray-100 text-gray-600 font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-wider text-sm">
            Plan Básico
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Cuenta Gratis</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Actualmente puedes navegar por los perfiles y leer reseñas sin costo. <br/><br/>
            Si deseas enviar mensajes ilimitados a los cuidadores y reservar a través de Pawners con una tarifa reducida (del 15% al 3%), necesitas una suscripción Premium.
          </p>
          <Link to="/precios" className="btn-primary text-lg px-8 py-3 w-full sm:w-auto inline-block">
            Ver Planes Premium
          </Link>
        </div>
      )}
    </div>
  );
}
