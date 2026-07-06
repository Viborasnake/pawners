import { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';

export default function Bookings() {
  const [bookings] = useState([
    { id: 'RES-1029', status: 'pending', caregiver: 'Cristian P.', type: 'Guardería de día', dates: 'Sab, 15 Jun', total: 15000, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 'RES-1028', status: 'confirmed', caregiver: 'María J.', type: 'Alojamiento', dates: '12 Jun - 14 Jun', total: 45000, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'RES-1020', status: 'completed', caregiver: 'Carlos V.', type: 'Paseo', dates: '1 Jun', total: 12000, avatar: 'https://i.pravatar.cc/150?img=11' },
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md">Esperando Respuesta</span>;
      case 'confirmed': return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">Reservado</span>;
      case 'completed': return <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">Completado</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis Reservas</h2>
          <p className="text-gray-500">Haz seguimiento de los servicios agendados para tus mascotas.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary">
            <option>Todas las reservas</option>
            <option>Próximas</option>
            <option>Pasadas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Estado / ID</th>
              <th className="p-4 font-semibold">Cuidador</th>
              <th className="p-4 font-semibold">Fechas / Servicio</th>
              <th className="p-4 font-semibold text-right">Total Pagado</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 align-top">
                  {getStatusBadge(booking.status)}
                  <div className="font-mono text-xs text-gray-400 mt-2">{booking.id}</div>
                </td>
                <td className="p-4 align-top">
                  <div className="flex items-center gap-3">
                    <img src={booking.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{booking.caregiver}</p>
                      <button className="text-xs text-primary font-medium hover:underline">Ver perfil</button>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1">
                    <Calendar size={14} className="text-gray-400" /> {booking.dates}
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">{booking.type}</div>
                </td>
                <td className="p-4 align-top text-right">
                  <p className="font-bold text-gray-900">${booking.total.toLocaleString('es-CL')}</p>
                </td>
                <td className="p-4 align-top text-center">
                  <button className="text-primary text-sm font-semibold hover:underline">Ver Recibo</button>
                  {booking.status === 'completed' && (
                    <button className="block mx-auto mt-2 text-accent text-sm font-semibold hover:underline">Dejar Reseña</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn-outline flex items-center gap-2 mx-auto bg-white">
          <Search size={18} /> Buscar nuevo cuidador
        </button>
      </div>
    </div>
  );
}
