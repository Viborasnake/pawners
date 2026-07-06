import { useState } from 'react';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';

export default function Bookings() {
  const [bookings] = useState([
    { id: 'RES-1029', status: 'pending', owner: 'Familia Ramírez', pet: 'Max (Golden)', dates: 'Sab, 15 Jun', type: 'Guardería de día', price: 15000 },
    { id: 'RES-1028', status: 'confirmed', owner: 'Laura Gómez', pet: 'Luna (Gato)', dates: '12 Jun - 14 Jun', type: 'Alojamiento', price: 45000 },
    { id: 'RES-1020', status: 'completed', owner: 'Pedro S.', pet: 'Rocky (Bulldog)', dates: '1 Jun - 2 Jun', type: 'Alojamiento', price: 30000 },
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md">Pendiente de Aprobación</span>;
      case 'confirmed': return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">Confirmada</span>;
      case 'completed': return <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">Completada</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h2>
          <p className="text-gray-500">Aprueba, rechaza y visualiza tus servicios programados.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary">
            <option>Todas las reservas</option>
            <option>Pendientes</option>
            <option>Confirmadas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">ID / Estado</th>
              <th className="p-4 font-semibold">Familia / Mascota</th>
              <th className="p-4 font-semibold">Fechas / Servicio</th>
              <th className="p-4 font-semibold text-right">Tu Ganancia</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 align-top">
                  <div className="font-mono text-xs text-gray-500 mb-1">{booking.id}</div>
                  {getStatusBadge(booking.status)}
                </td>
                <td className="p-4 align-top">
                  <p className="font-bold text-sm text-gray-900">{booking.owner}</p>
                  <p className="text-sm text-primary flex items-center gap-1 mt-1"><PawPrintIcon /> {booking.pet}</p>
                </td>
                <td className="p-4 align-top">
                  <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1">
                    <Calendar size={14} className="text-gray-400" /> {booking.dates}
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">{booking.type}</div>
                </td>
                <td className="p-4 align-top text-right">
                  <p className="font-bold text-gray-900">${booking.price.toLocaleString('es-CL')}</p>
                  <p className="text-[10px] text-green-600 font-medium mt-1">+ Sin comisiones</p>
                </td>
                <td className="p-4 align-top">
                  {booking.status === 'pending' ? (
                    <div className="flex justify-center gap-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors" title="Aceptar">
                        <Check size={16} />
                      </button>
                      <button className="bg-red-100 text-red-600 hover:bg-red-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors" title="Rechazar">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button className="text-primary text-sm font-semibold hover:underline">Ver Detalle</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {bookings.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No tienes reservas en este momento.
          </div>
        )}
      </div>
    </div>
  );
}

function PawPrintIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c1.7 0 2.6 1.5 3 3 .4 1.5 0 3-3 3s-3.4-1.5-3-3 .9-3 3-3Z"/><path d="M18.8 6.4c1.6 1.1 2.3 2.9 2.1 4.4-.2 1.5-1.9 2.5-3.5 1.5-1.6-1.1-1.7-3.1-1.5-4.4.2-1.5 1.4-2.6 2.9-1.5Z"/><path d="M5.2 6.4c-1.6 1.1-2.3 2.9-2.1 4.4.2 1.5 1.9 2.5 3.5 1.5 1.6-1.1 1.7-3.1 1.5-4.4-.2-1.5-1.4-2.6-2.9-1.5Z"/><path d="M12 11.5c-2.4 0-4.6 1.5-5.5 3.5-.7 1.5-.2 3.5 1.5 4.5 2 1.2 4.4 1 6 0 1.7-1 2.2-3 1.5-4.5-.9-2-3.1-3.5-5.5-3.5Z"/></svg>
  );
}
