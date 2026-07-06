import { useState } from 'react';
import { Plus, Edit2, Trash2, Camera } from 'lucide-react';

export default function Pets() {
  const [pets] = useState([
    {
      id: 1,
      name: 'Max',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      weight: '28 kg',
      needs: 'Alergia al pollo. Necesita 2 paseos largos al día.',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Gato',
      breed: 'Siamés',
      age: '1 año',
      weight: '4 kg',
      needs: 'Ninguna',
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop'
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis Mascotas</h2>
          <p className="text-gray-500">Agrega y administra los perfiles de tus mejores amigos.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Añadir Mascota
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-4">
              <div className="relative group">
                <img src={pet.avatar} alt={pet.name} className="w-32 h-32 md:w-full md:h-full object-cover rounded-2xl shadow-md" />
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:text-primary transition-colors">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs">Tipo</span>
                    <span className="font-semibold text-gray-800">{pet.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Raza</span>
                    <span className="font-semibold text-gray-800">{pet.breed}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Edad</span>
                    <span className="font-semibold text-gray-800">{pet.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Peso</span>
                    <span className="font-semibold text-gray-800">{pet.weight}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary-light/30 p-3 rounded-xl border border-primary/10">
                <span className="text-primary-dark font-bold text-xs block mb-1">Cuidados Especiales / Notas</span>
                <p className="text-sm text-gray-700">{pet.needs}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
