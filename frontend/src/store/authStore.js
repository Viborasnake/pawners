import { create } from 'zustand';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const DEMO_USER = {
  id: 'demo-owner-viborasnake',
  fullName: 'Cristian Pizarro',
  firstName: 'Cristian',
  lastName: 'Pizarro',
  email: 'viborasnake@gmail.com',
  phone: '+56 9 1234 5678',
  address: 'Santiago, Chile',
  avatar: 'https://i.pravatar.cc/150?img=33',
  role: 'owner'
};

const DEMO_SESSION_KEY = 'pawners_demo_session';

const hasStoredDemoSession = () => (
  typeof window !== 'undefined' && window.localStorage.getItem(DEMO_SESSION_KEY) === 'active'
);

const storeDemoSession = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DEMO_SESSION_KEY, 'active');
  }
};

const clearDemoSession = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
  }
};

const isDemoCredentials = (email, password) => (
  email.trim().toLowerCase() === DEMO_USER.email && password === '123456'
);

const authUserFromProfile = (profile) => ({
  id: profile.id,
  fullName: profile.full_name,
  firstName: profile.full_name?.split(' ')[0] || '',
  lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
  email: profile.email,
  phone: profile.phone,
  address: profile.address,
  avatar: profile.avatar_url,
  role: profile.role
});

const friendlyAuthError = (error) => {
  const message = error?.message || '';

  if (message === 'Load failed' || message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return 'No pudimos conectar con el servicio de autenticación. Supabase no está configurado o no está disponible.';
  }

  if (message.includes('Invalid login credentials')) {
    return 'Email o contraseña incorrectos.';
  }

  return message || 'No pudimos completar la autenticación.';
};

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

      if (!isSupabaseConfigured) {
        if (hasStoredDemoSession()) {
          set({
            isAuthenticated: true,
            role: DEMO_USER.role,
            user: DEMO_USER,
            isLoading: false
          });
          return;
        }

        set({ isAuthenticated: false, user: null, role: null, isLoading: false });
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        await get().fetchUserProfile(session.user.id, session.user);
      } else {
        set({ isAuthenticated: false, user: null, role: null, isLoading: false });
      }
      
      // Escuchar cambios en la autenticación (login/logout automáticos)
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await get().fetchUserProfile(session.user.id, session.user);
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
  fetchUserProfile: async (userId, authUser = null) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      const user = authUserFromProfile(profile);
      set({ 
        isAuthenticated: true, 
        role: user.role,
        user,
        isLoading: false
      });
    } catch (error) {
      console.error('Error obteniendo perfil:', error);

      if (authUser) {
        const metadata = authUser.user_metadata || {};
        const fallbackUser = {
          id: authUser.id,
          fullName: metadata.full_name || authUser.email,
          firstName: metadata.full_name?.split(' ')[0] || '',
          lastName: metadata.full_name?.split(' ').slice(1).join(' ') || '',
          email: authUser.email,
          phone: metadata.phone || '',
          address: '',
          avatar: metadata.avatar_url,
          role: metadata.role || 'owner'
        };

        set({
          isAuthenticated: true,
          role: fallbackUser.role,
          user: fallbackUser,
          isLoading: false
        });
        return;
      }

      set({ isAuthenticated: false, isLoading: false });
    }
  },

  // 3. Registro
  register: async (email, password, fullName, role) => {
    try {
      if (!isSupabaseConfigured) {
        return {
          success: false,
          error: 'El registro real requiere configurar Supabase. Por ahora usa viborasnake@gmail.com con contraseña 123456 para entrar al demo.'
        };
      }

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
      return { success: false, error: friendlyAuthError(error) };
    }
  },

  // 4. Login
  login: async (email, password) => {
    try {
      if (!isSupabaseConfigured) {
        if (!isDemoCredentials(email, password)) {
          return { success: false, error: 'Email o contraseña incorrectos. Para el demo usa viborasnake@gmail.com / 123456.' };
        }

        storeDemoSession();

        set({
          isAuthenticated: true,
          role: DEMO_USER.role,
          user: DEMO_USER,
          isLoading: false
        });

        return {
          success: true,
          data: {
            user: {
              id: DEMO_USER.id,
              email: DEMO_USER.email,
              user_metadata: {
                role: DEMO_USER.role,
                full_name: DEMO_USER.fullName
              }
            }
          }
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.user) {
        await get().fetchUserProfile(data.user.id, data.user);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: friendlyAuthError(error) };
    }
  },

  // 5. Logout
  logout: async () => {
    try {
      if (!isSupabaseConfigured) {
        clearDemoSession();
        set({ isAuthenticated: false, user: null, role: null });
        return;
      }

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
