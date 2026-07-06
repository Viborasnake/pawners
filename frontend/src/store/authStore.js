import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  isLoading: true, // Para mostrar un loading mientras se recupera la sesión
  role: null, // 'owner' | 'caregiver' | 'both'
  user: null, // Datos del usuario y su perfil
  unlockedCaregivers: [], // Estado simulado para guardar cuidadores desbloqueados

  // 1. Inicializar sesión (se llama desde App.jsx al cargar la app)
  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        await get().fetchUserProfile(session.user.id);
      } else {
        set({ isAuthenticated: false, user: null, role: null, isLoading: false });
      }
      
      // Escuchar cambios en la autenticación (login/logout automáticos)
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await get().fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          set({ isAuthenticated: false, user: null, role: null });
        }
      });
    } catch (error) {
      console.error('Error al inicializar sesión:', error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  // 2. Cargar datos del perfil desde la tabla public.profiles
  fetchUserProfile: async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      set({ 
        isAuthenticated: true, 
        role: profile.role,
        user: {
          id: profile.id,
          fullName: profile.full_name,
          email: profile.email, // Necesitamos pasarlo o recuperarlo
          phone: profile.phone,
          address: profile.address,
          avatar: profile.avatar_url
        },
        isLoading: false
      });
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  // 3. Registro
  register: async (email, password, fullName, role) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 4. Login
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 5. Logout
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ isAuthenticated: false, user: null, role: null });
    } catch (error) {
      console.error('Error en logout:', error);
    }
  },

  // 6. Actualizar usuario (Perfil local por ahora)
  updateUser: (newData) => set((state) => ({
    user: { ...state.user, ...newData }
  })),

  // 7. Simular Desbloqueo de Cuidador
  unlockCaregiver: (caregiverData) => set((state) => {
    // Evitar duplicados
    const exists = state.unlockedCaregivers.find(c => c.id === caregiverData.id);
    if (exists) return state;
    return {
      unlockedCaregivers: [...state.unlockedCaregivers, caregiverData]
    };
  })
}));
