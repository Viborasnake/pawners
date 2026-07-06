import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import PrivateLayout from './components/layout/PrivateLayout';
import Home from './pages/public/Home';
import Pricing from './pages/public/Pricing';
import SearchListings from './pages/public/SearchListings';
import HowItWorks from './pages/public/HowItWorks';
import AuthPage from './pages/auth/AuthPage';

// Owner
import OwnerOnboarding from './pages/owner/Onboarding';
import OwnerDashboard from './pages/owner/Dashboard';
import SubscriptionCheckout from './pages/owner/SubscriptionCheckout';
import SubscriptionManager from './pages/owner/SubscriptionManager';
import BookingCheckout from './pages/owner/BookingCheckout';
import OwnerPets from './pages/owner/Pets';
import OwnerMessages from './pages/owner/Messages';
import OwnerBookings from './pages/owner/Bookings';
import OwnerFavorites from './pages/owner/Favorites';
import OwnerProfile from './pages/owner/Profile';
import OwnerSettings from './pages/owner/Settings';

// Caregiver
import CaregiverOnboarding from './pages/caregiver/Onboarding';
import CaregiverDashboard from './pages/caregiver/Dashboard';
import CaregiverMyListing from './pages/caregiver/MyListing';
import CaregiverContacts from './pages/caregiver/Contacts';
import CaregiverBookings from './pages/caregiver/Bookings';
import CaregiverPublicProfile from './pages/caregiver/PublicProfile';
import CaregiverSettings from './pages/caregiver/Settings';
import CaregiverBoostCheckout from './pages/caregiver/BoostCheckout';
import ContactVisitorCheckout from './pages/caregiver/ContactVisitorCheckout';

// Common
import PlaceholderPage from './components/common/PlaceholderPage';

import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
  const { initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Cargando aplicación...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="como-funciona" element={<HowItWorks />} />
          <Route path="precios" element={<Pricing />} />
          <Route path="buscar" element={<SearchListings />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Flujos de Checkout visualmente limpios sin layout completo */}
        <Route path="/checkout/suscripcion" element={<SubscriptionCheckout />} />
        <Route path="/checkout/reserva" element={<BookingCheckout />} />
        <Route path="/checkout/destacar" element={<CaregiverBoostCheckout />} />
        <Route path="/checkout/contactar-visitante" element={<ContactVisitorCheckout />} />

        {/* Private Routes */}
        <Route path="/panel" element={<PrivateLayout />}>
          {/* Owner */}
          <Route path="owner/onboarding" element={<OwnerOnboarding />} />
          <Route path="owner/dashboard" element={<OwnerDashboard />} />
          <Route path="owner/suscripcion" element={<SubscriptionManager />} />
          <Route path="owner/buscar" element={<SearchListings />} />
          <Route path="owner/mascotas" element={<OwnerPets />} />
          <Route path="owner/mensajes" element={<OwnerMessages />} />
          <Route path="owner/reservas" element={<OwnerBookings />} />
          <Route path="owner/favoritos" element={<OwnerFavorites />} />
          <Route path="owner/perfil" element={<OwnerProfile />} />
          <Route path="owner/configuracion" element={<OwnerSettings />} />
          
          {/* Caregiver */}
          <Route path="caregiver/onboarding" element={<CaregiverOnboarding />} />
          <Route path="caregiver/dashboard" element={<CaregiverDashboard />} />
          <Route path="caregiver/anuncio" element={<CaregiverMyListing />} />
          <Route path="caregiver/contactos" element={<CaregiverContacts />} />
          <Route path="caregiver/reservas" element={<CaregiverBookings />} />
          <Route path="caregiver/perfil" element={<CaregiverPublicProfile />} />
          <Route path="caregiver/configuracion" element={<CaregiverSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
