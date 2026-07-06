import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Eye, Trash2, PauseCircle, PlayCircle, AlertTriangle, Camera, ImagePlus, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCaregiverStore } from '../../store/caregiverStore';

const PREDEFINED_SERVICES = {
  'paseo': { label: 'Paseo de perros', emoji: '🦮' },
  'domicilio': { label: 'Cuidado a domicilio', emoji: '🏠' },
  'hogar': { label: 'Cuidado en mi hogar', emoji: '🛋️' },
  'largos': { label: 'Periodos largos', emoji: '📅' },
  'otro': { label: 'Otro (especificar)', emoji: '✏️' },
};

const PERIODS = ['Hora', 'Día', 'Tarde', 'Noche', 'Mes', 'Visita'];

export default function MyListing() {
  const navigate = useNavigate();
  const { listing, updateListing, status, setStatus, deleteListing, createListing } = useCaregiverStore();
  const [error, setError] = useState('');
  const [saveState, setSaveState] = useState('idle'); // idle | dirty | saving | saved
  const [formData, setFormData] = useState(listing || {});
  const initialDataRef = useRef(JSON.stringify(listing));

  // Sync from store
  useEffect(() => {
    if (listing) {
      setFormData(listing);
      initialDataRef.current = JSON.stringify(listing);
    }
  }, [listing]);

  // Detect unsaved changes
  useEffect(() => {
    if (JSON.stringify(formData) !== initialDataRef.current) {
      setSaveState('dirty');
    }
  }, [formData]);

  /* ── Image compression ── */
  const compressImage = (file, maxW, maxH, quality = 0.75) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxW || height > maxH) {
            const ratio = Math.min(maxW / width, maxH / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (field, file) => {
    if (!file) return;
    const [maxW, maxH] = field === 'profileImage' ? [400, 400] : [900, 400];
    const compressed = await compressImage(file, maxW, maxH, 0.75);
    setFormData(prev => ({ ...prev, [field]: compressed }));
  };

  /* ── Services ── */
  const handleAddService = () =>
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), type: 'paseo', customName: '', price: 0, priceNegotiable: false, period: 'Hora' }]
    }));

  const handleRemoveService = (id) =>
    setFormData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));

  const handleServiceChange = (id, field, value) =>
    setFormData(prev => ({ ...prev, services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s) }));

  /* ── Validation ── */
  const containsContactInfo = (text) => {
    const lower = text.toLowerCase();
    const digitsOnly = text.replace(/[\s\-\.]/g, '');
    if (/\d{8}/.test(digitsOnly)) return true;
    const keywords = ['whatsapp', 'wsp', 'wzp', 'instagram', 'ig:', '@', 'fono', 'celular', 'llámame', 'llamame', 'contacto'];
    if (keywords.some(kw => lower.includes(kw))) return true;
    const numberWords = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
    let count = 0;
    numberWords.forEach(w => { const m = lower.match(new RegExp(`\\b${w}\\b`, 'g')); if (m) count += m.length; });
    return count >= 6;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');
    if (containsContactInfo(formData.description)) {
      setError('No puedes incluir información de contacto (teléfonos, redes sociales, etc.) en tu anuncio.');
      return;
    }
    setSaveState('saving');
    updateListing(formData);
    initialDataRef.current = JSON.stringify(formData);
    setTimeout(() => setSaveState('saved'), 500);
    setTimeout(() => setSaveState('idle'), 3000);
  };

  const handlePauseToggle = () => setStatus(status === 'paused' ? 'active' : 'paused');
  const handleDelete = () => {
    if (window.confirm('¿Eliminar tu anuncio? Tendrás que configurarlo desde cero.')) deleteListing();
  };

  /* ── Empty state ── */
  if (status === 'none') {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus size={36} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Sin anuncio activo</h2>
        <p className="text-gray-500 mb-8">Crea tu anuncio para conectar con dueños de mascotas en tu zona.</p>
        <button onClick={createListing} className="btn-primary px-8 py-3 text-lg font-bold">Crear mi Anuncio</button>
      </div>
    );
  }

  const isDirty = saveState === 'dirty';
  const isSaving = saveState === 'saving';
  const isSaved = saveState === 'saved';

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Mi Anuncio
            {status === 'paused' && <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold">Pausado</span>}
            {status === 'active' && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold">Activo</span>}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Así te ven las familias en los resultados de búsqueda.</p>
        </div>
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate('/panel/caregiver/perfil')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors">
            <Eye size={16} /> Vista previa
          </button>
          <button onClick={handleSubmit}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-all ${
              isSaved ? 'bg-green-500 text-white' :
              isDirty ? 'bg-primary text-white shadow-md shadow-primary/30 animate-pulse' :
              'bg-primary hover:bg-primary-dark text-white'
            }`}>
            {isSaved ? <><Check size={16} /> Guardado</> :
             isDirty ? <><Save size={16} /> Guardar cambios</> :
             <><Save size={16} /> Guardar</>}
          </button>
        </div>
      </div>

      {/* Unsaved changes banner */}
      {isDirty && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <p className="text-amber-800 text-sm font-medium">⚠️ Tienes cambios sin guardar</p>
          <button onClick={handleSubmit} className="text-amber-700 font-bold text-sm underline hover:no-underline">
            Guardar ahora
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium flex items-start gap-2">
          <X size={16} className="shrink-0 mt-0.5" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* === SECTION 1: Photos === */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Camera size={18} className="text-primary" />
            <h3 className="font-bold text-gray-800">Fotos</h3>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Foto de portada</label>
              <div
                className="relative h-36 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer group hover:border-primary transition-colors bg-gray-50"
                style={formData.coverImage ? { backgroundImage: `url(${formData.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => handleImageUpload('coverImage', e.target.files[0])} />
                {!formData.coverImage && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
                    <ImagePlus size={28} />
                    <span className="text-xs font-medium">Subir portada</span>
                  </div>
                )}
                {formData.coverImage && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Cambiar imagen</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Foto de perfil</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={formData.profileImage || "https://i.pravatar.cc/150?img=33"}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt="Avatar" />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full shadow cursor-pointer">
                    <Camera size={14} />
                  </div>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10 rounded-full"
                    onChange={(e) => handleImageUpload('profileImage', e.target.files[0])} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Foto cuadrada</p>
                  <p className="text-xs text-gray-400">Mín. 200×200px · JPG o PNG</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === SECTION 2: Description === */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Descripción</h3>
            <p className="text-xs text-gray-400 mt-0.5">Cuéntales a las familias quién eres y por qué confiar en ti.</p>
          </div>
          <div className="p-6">
            <textarea rows={4}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm text-gray-700 leading-relaxed resize-none"
              placeholder="Ej: Tengo experiencia cuidando perros de todas las edades. Mi casa tiene un patio cerrado seguro…"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <p className="text-xs text-gray-400 mt-2">No incluyas teléfonos ni redes sociales — es motivo de suspensión.</p>
          </div>
        </div>

        {/* === SECTION 3: Services === */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Servicios y Tarifas</h3>
            <p className="text-xs text-gray-400 mt-0.5">Define qué ofreces y cuánto cobras.</p>
          </div>
          <div className="p-6 space-y-3">
            {formData.services.map((service) => (
              <div key={service.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                {/* Service header */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{PREDEFINED_SERVICES[service.type]?.emoji || '✏️'}</span>
                    <select
                      className="bg-transparent font-semibold text-gray-800 text-sm focus:outline-none cursor-pointer"
                      value={service.type}
                      onChange={(e) => handleServiceChange(service.id, 'type', e.target.value)}
                    >
                      {Object.entries(PREDEFINED_SERVICES).map(([key, { label }]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <button type="button" onClick={() => handleRemoveService(service.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Service body */}
                <div className="px-4 py-4 flex flex-wrap gap-4 items-end">
                  {/* Custom name if "otro" */}
                  {service.type === 'otro' && (
                    <div className="w-full">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Nombre del servicio</label>
                      <input type="text" placeholder="Describe tu servicio…"
                        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                        value={service.customName}
                        onChange={(e) => handleServiceChange(service.id, 'customName', e.target.value)} />
                    </div>
                  )}

                  {/* Period */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Por</label>
                    <select
                      className="p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none bg-white"
                      value={service.period}
                      onChange={(e) => handleServiceChange(service.id, 'period', e.target.value)}
                    >
                      {PERIODS.map(p => <option key={p} value={p.toLowerCase()}>{p}</option>)}
                    </select>
                  </div>

                  {/* Price negotiable toggle */}
                  <div className="flex items-center gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() => handleServiceChange(service.id, 'priceNegotiable', !service.priceNegotiable)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${service.priceNegotiable ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${service.priceNegotiable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-xs font-medium text-gray-600">A convenir</span>
                  </div>

                  {/* Price input — hidden if negotiable */}
                  {!service.priceNegotiable && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Precio</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                        <input type="number"
                          className="w-32 pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                          value={service.price}
                          onChange={(e) => handleServiceChange(service.id, 'price', parseInt(e.target.value) || 0)} />
                      </div>
                    </div>
                  )}

                  {/* Price negotiable badge */}
                  {service.priceNegotiable && (
                    <div className="bg-primary-light text-primary font-semibold text-sm px-4 py-2.5 rounded-xl">
                      Precio a convenir
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={handleAddService}
              className="flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors pt-1">
              <Plus size={18} /> Añadir servicio
            </button>
          </div>
        </div>

        {/* === SECTION 4: Danger zone === */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h3 className="font-bold text-red-700 text-sm">Zona de peligro</h3>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 text-sm mb-1">
                {status === 'paused' ? 'Tu anuncio está pausado' : 'Pausar o eliminar anuncio'}
              </p>
              <p className="text-xs text-gray-500">
                {status === 'paused'
                  ? 'Reactívalo para volver a aparecer en búsquedas.'
                  : 'Si lo pausas, desapareces temporalmente. Si lo eliminas, pierdes toda la configuración.'}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={handlePauseToggle}
                className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                {status === 'paused' ? <><PlayCircle size={16} /> Reactivar</> : <><PauseCircle size={16} /> Pausar</>}
              </button>
              <button type="button" onClick={handleDelete}
                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
