import { useState } from 'react';
import { Save, Banknote, Bell, Lock, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('personal');
  const { user, updateUser } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    
    if (firstName && lastName) {
      updateUser({ firstName, lastName });
    }
    
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Configuración de Cuenta</h2>
        <p className="text-gray-500">Administra tus datos personales, pagos y notificaciones.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'personal' ? 'bg-primary-light text-primary-dark font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <User size={18} /> Datos Personales
          </button>
          <button 
            onClick={() => setActiveTab('bank')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'bank' ? 'bg-primary-light text-primary-dark font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Banknote size={18} /> Cuenta Bancaria
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'notifications' ? 'bg-primary-light text-primary-dark font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Bell size={18} /> Notificaciones
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'security' ? 'bg-primary-light text-primary-dark font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Lock size={18} /> Seguridad
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            
            {activeTab === 'personal' && (
              <>
                <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Datos Personales</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-4 items-center mb-8">
                    <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                    <button type="button" className="btn-outline text-sm">Cambiar Foto</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input name="firstName" type="text" defaultValue={user.firstName} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                      <input name="lastName" type="text" defaultValue={user.lastName} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input type="email" defaultValue={user.email} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input type="tel" defaultValue={user.phone} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (No será pública)</label>
                    <input type="text" defaultValue={user.address} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2"><Save size={18} /> Guardar Cambios</button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'bank' && (
              <>
                <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Cuenta Bancaria</h3>
                <p className="text-sm text-gray-500 mb-6">Aquí transferiremos tus ganancias después de completar cada servicio. Pawners no cobra comisiones a los cuidadores.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                      <option>Banco Estado</option>
                      <option>Banco Santander</option>
                      <option>Banco de Chile</option>
                      <option>Banco BCI</option>
                      <option>Banco Itaú</option>
                      <option>Scotiabank</option>
                      <option>Banco Falabella</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                      <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                        <option>Cuenta RUT / Vista</option>
                        <option>Cuenta Corriente</option>
                        <option>Cuenta de Ahorro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                      <input type="text" placeholder="Ej. 123456789" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RUT del Titular</label>
                    <input type="text" placeholder="12.345.678-9" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2"><Save size={18} /> Guardar Banco</button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Preferencias de Notificaciones</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Nuevos Mensajes</p>
                        <p className="text-xs text-gray-500">Avisarme cuando un dueño me escriba</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Solicitudes de Reserva</p>
                        <p className="text-xs text-gray-500">Recibir alertas de nuevas reservas</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                    </label>
                    <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Boletín Pawners</p>
                        <p className="text-xs text-gray-500">Recibir noticias, consejos y ofertas</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-primary" />
                    </label>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2"><Save size={18} /> Guardar Preferencias</button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Seguridad y Contraseña</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                    <input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="pt-4 border-t border-gray-100"></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                    <input type="password" placeholder="Ingresa nueva contraseña" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                    <input type="password" placeholder="Repite la nueva contraseña" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2"><Save size={18} /> Actualizar Contraseña</button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
