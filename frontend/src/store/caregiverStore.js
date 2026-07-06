import { create } from 'zustand';

export const useCaregiverStore = create((set) => ({
  status: 'active', // 'active', 'paused', 'none'
  listing: {
    profileImage: 'https://i.pravatar.cc/150?img=33',
    coverImage: '',
    description: 'Tengo experiencia cuidando perros de todas las edades. Mi casa tiene un patio cerrado muy seguro donde pueden jugar todo el día.',
    services: [
      { id: 1, type: 'hogar', customName: '', price: 15000, period: 'noche' },
      { id: 2, type: 'paseo', customName: '', price: 12000, period: 'dia' }
    ]
  },
  
  setStatus: (newStatus) => set({ status: newStatus }),
  
  updateListing: (newListingData) => set((state) => ({
    listing: { ...state.listing, ...newListingData }
  })),

  deleteListing: () => set({
    status: 'none',
    listing: {
      profileImage: '',
      coverImage: '',
      description: '',
      services: []
    }
  }),

  createListing: () => set({
    status: 'active',
    listing: {
      profileImage: 'https://i.pravatar.cc/150?img=33',
      coverImage: '',
      description: '',
      services: [{ id: Date.now(), type: 'paseo', customName: '', price: 10000, period: 'hora' }]
    }
  })
}));
