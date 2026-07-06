import { useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "María J.",
      avatar: "https://i.pravatar.cc/150?img=1",
      comuna: "Providencia",
      rating: 4.9,
      reviews: 24,
      title: "Amante de los perros con patio grande",
      price: 15000,
    },
    {
      id: 2,
      name: "Carlos V.",
      avatar: "https://i.pravatar.cc/150?img=11",
      comuna: "Las Condes",
      rating: 4.7,
      reviews: 12,
      title: "Paseos largos y mucho ejercicio",
      price: 12000,
    }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Cuidadores Favoritos</h2>
        <p className="text-gray-500">Cuidadores que has guardado para contactar en el futuro.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes favoritos aún</h3>
          <p className="text-gray-500 mb-6">Explora cuidadores en tu zona y guárdalos presionando el ícono del corazón.</p>
          <button className="btn-primary">Buscar Cuidadores</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(caregiver => (
            <div key={caregiver.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative">
              <button 
                onClick={() => removeFavorite(caregiver.id)}
                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white hover:scale-110 transition-all shadow-sm"
              >
                <Heart size={18} className="fill-red-500" />
              </button>
              
              <div className="h-32 bg-gradient-to-r from-primary-light to-secondary-light relative"></div>
              
              <div className="p-5 relative">
                <img 
                  src={caregiver.avatar} 
                  alt={caregiver.name} 
                  className="w-16 h-16 rounded-full border-4 border-white absolute -top-8 left-5 object-cover"
                />
                <div className="flex justify-between items-start mt-8 mb-2">
                  <h3 className="font-bold text-lg">{caregiver.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star size={16} className="text-accent fill-accent" />
                    {caregiver.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin size={14} /> {caregiver.comuna}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{caregiver.title}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="font-bold text-lg text-primary">${caregiver.price.toLocaleString('es-CL')} <span className="text-xs text-gray-500 font-normal">/ noche</span></p>
                  <button className="btn-primary py-1.5 px-4 text-sm">Contactar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
