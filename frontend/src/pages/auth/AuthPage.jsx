import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PawPrint, AlertCircle, Loader2, Eye, EyeOff, User, Mail, Lock, Phone, Heart, Star, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

/* ── Chilean phone validator ── */
const formatPhone = (raw) => {
  // Strip everything except digits
  const digits = raw.replace(/\D/g, '');
  // Accept with or without 56 prefix
  const local = digits.startsWith('56') ? digits.slice(2) : digits;
  // Format: 9 XXXX XXXX
  if (local.length <= 1) return local;
  if (local.length <= 5) return `${local.slice(0,1)} ${local.slice(1)}`;
  return `${local.slice(0,1)} ${local.slice(1,5)} ${local.slice(5,9)}`;
};

const isValidChileanPhone = (raw) => {
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('56') ? digits.slice(2) : digits;
  return local.length === 9 && local.startsWith('9');
};

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') || 'owner';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  const { login, register } = useAuthStore();

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    const local = digits.startsWith('56') ? digits.slice(2) : digits;
    if (local.length <= 9) {
      setPhone(formatPhone(raw));
    }
    setPhoneError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPhoneError('');

    if (mode === 'register' && !isValidChileanPhone(phone)) {
      setPhoneError('Ingresa un número válido: 9 XXXX XXXX');
      return;
    }

    setLoading(true);
    let result;

    if (mode === 'register') {
      result = await register(email, password, fullName, role, phone);
    } else {
      result = await login(email, password);
    }

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    const targetRole = result.data.user?.user_metadata?.role || role;
    navigate(targetRole === 'owner' ? '/panel/owner/dashboard' : '/panel/caregiver/dashboard');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
    setPhoneError('');
  };

  const isRegister = mode === 'register';

  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 -left-20 w-64 h-64 bg-white/5 rounded-full" />

        <Link to="/" className="flex items-center gap-3">
          <PawPrint className="h-9 w-9" />
          <span className="font-bold text-2xl tracking-tight">Pawners</span>
        </Link>

        <div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Tu mascota merece<br />el mejor cuidado.
          </h2>
          <p className="text-primary-light text-lg mb-10">
            Conectamos dueños de mascotas con cuidadores de confianza en todo Chile.
          </p>

          <div className="space-y-4">
            {[
              { icon: Heart, text: 'Cuidadores verificados con reseñas reales' },
              { icon: Phone, text: 'Contacto directo por WhatsApp, sin intermediarios' },
              { icon: Star, text: 'Sin comisiones ocultas — tú coordinadas el precio' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <p className="text-sm text-primary-light">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-primary-light/60">© 2026 Pawners · Hecho con ❤️ en Chile</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-gray-50">
        {/* Mobile logo */}
        <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
          <PawPrint className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl tracking-tight text-gray-900">Pawners</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Mode tabs */}
          <div className="flex bg-white border border-gray-200 rounded-2xl p-1 mb-8 shadow-sm">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${mode === 'login' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${mode === 'register' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Registrarse
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {isRegister ? 'Crear cuenta' : 'Bienvenido de nuevo'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isRegister ? 'Solo toma un minuto.' : 'Ingresa tus credenciales para continuar.'}
            </p>

            {/* Role selector (register only) */}
            {isRegister && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    role === 'owner'
                      ? 'border-primary bg-primary-light/30 text-primary'
                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span className="text-2xl">🐾</span>
                  <div className="text-center">
                    <p className="font-bold text-sm">Busco cuidador</p>
                    <p className="text-xs opacity-70">Para mi mascota</p>
                  </div>
                  {role === 'owner' && <CheckCircle2 size={16} className="text-primary" />}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('caregiver')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    role === 'caregiver'
                      ? 'border-secondary bg-secondary-light/30 text-secondary-dark'
                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span className="text-2xl">💼</span>
                  <div className="text-center">
                    <p className="font-bold text-sm">Quiero cuidar</p>
                    <p className="text-xs opacity-70">Genera ingresos</p>
                  </div>
                  {role === 'caregiver' && <CheckCircle2 size={16} className="text-secondary-dark" />}
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full name */}
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre completo</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      required type="text" value={fullName}
                      placeholder="María González"
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required type="email" value={email}
                    placeholder="tu@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* WhatsApp phone (register only) */}
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-sm">🇨🇱</span>
                      <span className="text-sm text-gray-400 font-medium">+56</span>
                    </div>
                    <input
                      required type="tel" value={phone}
                      placeholder="9 XXXX XXXX"
                      onChange={handlePhoneChange}
                      className={`w-full pl-16 pr-4 py-3 border rounded-xl text-sm focus:ring-2 outline-none ${
                        phoneError ? 'border-red-300 focus:ring-red-200' :
                        phone && isValidChileanPhone(phone) ? 'border-green-300 focus:ring-green-200' :
                        'border-gray-200 focus:ring-primary'
                      }`}
                    />
                    {phone && isValidChileanPhone(phone) && (
                      <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  {!phoneError && isRegister && (
                    <p className="text-xs text-gray-400 mt-1">Este número se compartirá cuando alguien te contacte.</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Contraseña</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required type={showPassword ? 'text' : 'password'} minLength={6} value={password}
                    placeholder={isRegister ? 'Mínimo 6 caracteres' : '••••••••'}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-primary/30 mt-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                {isRegister ? 'Crear cuenta gratis' : 'Entrar a mi cuenta'}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isRegister ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
            <button onClick={() => switchMode(isRegister ? 'login' : 'register')}
              className="text-primary font-semibold hover:underline">
              {isRegister ? 'Inicia sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
