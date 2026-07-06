import { useAuthStore } from '../../store/authStore';
import {
  Camera,
  CheckCircle2,
  Heart,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  PawPrint,
  Phone,
  Plus,
  ShieldCheck,
  User,
} from 'lucide-react';

const PETS = [
  {
    name: 'Max',
    type: 'Perro',
    breed: 'Golden Retriever',
    age: '3 anos',
    notes: 'Energetico, sociable y necesita dos paseos al dia.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
  },
  {
    name: 'Luna',
    type: 'Gato',
    breed: 'Siames',
    age: '1 ano',
    notes: 'Tranquila, prefiere espacios silenciosos y rutina estable.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
  },
];

const PREFERENCES = [
  'Fotos diarias durante el cuidado',
  'Casa segura y sin salidas abiertas',
  'Experiencia con gatos y perros',
  'Contacto por WhatsApp',
];

export default function Profile() {
  const { user } = useAuthStore();
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'Cristian';
  const lastInitial = user?.lastName?.charAt(0) || user?.fullName?.split(' ')?.[1]?.charAt(0) || 'P';
  const displayName = `${firstName} ${lastInitial}.`;

  return (
    <div className="mx-auto max-w-7xl pb-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-primary-dark">Perfil de familia</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">Tu perfil para cuidadores</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Esta informacion ayuda a que los cuidadores entiendan a tu familia antes de coordinar por WhatsApp.
          </p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white transition hover:bg-primary-dark">
          <Camera size={18} /> Actualizar fotos
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-32 bg-gradient-to-r from-gray-950 via-primary-dark to-primary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,162,97,0.32),_transparent_32%)]" />
            </div>

            <div className="p-5 pt-3 sm:p-6 sm:pt-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=33'}
                    alt="Avatar"
                    className="-mt-8 h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-lg"
                  />
                  <div className="pb-1">
                    <h2 className="text-2xl font-bold text-gray-950">{displayName}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                      <MapPin size={15} className="text-primary-dark" />
                      Providencia, Santiago
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-sm font-bold text-primary-dark">
                  <ShieldCheck size={16} /> Perfil visible para cuidadores
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['2', 'mascotas registradas'],
                  ['4', 'preferencias claras'],
                  ['80%', 'perfil completo'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-gray-50 px-4 py-3">
                    <p className="text-2xl font-bold text-gray-950">{value}</p>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950">
                  <User className="text-primary-dark" /> Sobre mi familia
                </h2>
                <p className="mt-1 text-sm text-gray-500">Lo que un cuidador necesita saber antes del primer contacto.</p>
              </div>
              <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                Editar
              </button>
            </div>

            <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
              Somos una familia de 3 que ama salir al parque los fines de semana. Buscamos cuidadores responsables y carinosos para nuestros peludos cuando salimos de vacaciones o tenemos dias largos en la oficina. Nos gusta recibir fotos diarias y coordinar detalles con tiempo.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-gray-950"><Mail size={16} className="text-primary-dark" /> Email</p>
                <p className="mt-1 text-sm text-gray-500">{user?.email || 'viborasnake@gmail.com'}</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-gray-950"><Phone size={16} className="text-primary-dark" /> WhatsApp</p>
                <p className="mt-1 text-sm text-gray-500">{user?.phone || '+56 9 1234 5678'}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950">
                  <PawPrint className="text-primary-dark" /> Mascotas en la familia
                </h2>
                <p className="mt-1 text-sm text-gray-500">Perfiles que ayudan al cuidador a preparar el servicio.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark">
                <Plus size={17} /> Agregar mascota
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {PETS.map((pet) => (
                <article key={pet.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img src={pet.image} alt={pet.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-950">{pet.name}</h3>
                          <p className="mt-1 text-sm font-medium text-gray-500">{pet.type} · {pet.breed} · {pet.age}</p>
                        </div>
                        <Heart size={18} className="shrink-0 text-rose-400" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{pet.notes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-gray-950">Estado del perfil</h2>
            <div className="mt-4 h-2 rounded-full bg-gray-100">
              <div className="h-2 w-4/5 rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-sm text-gray-500">80% completo. Agrega instrucciones de emergencia para mejorar la confianza.</p>

            <div className="mt-5 space-y-3">
              {[
                ['Datos personales', true],
                ['Mascotas registradas', true],
                ['Preferencias de cuidado', true],
                ['Contacto de emergencia', false],
              ].map(([label, done]) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
                  <CheckCircle2 size={18} className={done ? 'text-primary-dark' : 'text-gray-300'} />
                  <span className={`text-sm font-semibold ${done ? 'text-gray-800' : 'text-gray-500'}`}>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-gray-950">Preferencias de cuidado</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {PREFERENCES.map((preference) => (
                <span key={preference} className="rounded-full bg-primary-light px-3 py-1.5 text-xs font-bold text-primary-dark">
                  {preference}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-gray-950">Vista para cuidadores</h2>
            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <img src={user?.avatar || 'https://i.pravatar.cc/150?img=33'} alt={displayName} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-gray-950">{displayName}</p>
                  <p className="text-xs text-gray-500">Familia con 2 mascotas</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600">
                <span className="flex items-center gap-1.5"><Home size={14} className="text-primary-dark" /> Casa familiar</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-primary-dark" /> Fotos diarias</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
