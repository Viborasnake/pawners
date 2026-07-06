import { MessageCircle, Phone, Users, ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dueños que pagaron para contactar al cuidador
const INCOMING_CONTACTS = [
  { id: 1, name: 'María González', phone: '+56 9 8765 4321', avatar: 'https://i.pravatar.cc/150?img=5', service: 'Cuidado en mi hogar', date: '01/07/2026' },
  { id: 2, name: 'Carlos Pérez', phone: '+56 9 1234 5678', avatar: 'https://i.pravatar.cc/150?img=12', service: 'Paseo de perros', date: '28/06/2026' },
];

// Visitantes que el cuidador pagó para contactar
const OUTGOING_CONTACTS = [
  { id: 3, name: 'Sofía Martínez', phone: '+56 9 9876 5432', avatar: 'https://i.pravatar.cc/150?img=47', service: 'Visitó tu perfil', date: '02/07/2026' },
];

function ContactRow({ contact, type }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
      <img src={contact.avatar} alt={contact.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
          {type === 'incoming' ? (
            <span className="shrink-0 inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100">
              <ArrowDown size={10} /> Te contactó
            </span>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1 bg-primary-light text-primary-dark text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/10">
              <ArrowUp size={10} /> Tú contactaste
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{contact.service} · {contact.date}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <a
          href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors"
        >
          <Phone size={16} />
        </a>
      </div>
    </div>
  );
}

export default function CaregiverContacts() {
  const hasAny = INCOMING_CONTACTS.length > 0 || OUTGOING_CONTACTS.length > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Mis Contactos</h2>

      {!hasAny ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
          <Users size={40} className="text-gray-300 mb-4" />
          <p className="font-semibold text-gray-700 mb-2">Aún no tienes contactos</p>
          <p className="text-sm text-gray-400 mb-6">Cuando alguien desbloquee tu contacto o tú contactes a un visitante, aparecerá aquí.</p>
          <Link to="/panel/caregiver/anuncio" className="btn-primary text-sm">Mejorar mi anuncio</Link>
        </div>
      ) : (
        <>
          {/* Entrantes */}
          {INCOMING_CONTACTS.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ArrowDown size={15} className="text-green-600" />
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Dueños que te contactaron</p>
                <span className="ml-auto text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{INCOMING_CONTACTS.length}</span>
              </div>
              {INCOMING_CONTACTS.map(c => <ContactRow key={c.id} contact={c} type="incoming" />)}
            </div>
          )}

          {/* Salientes */}
          {OUTGOING_CONTACTS.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ArrowUp size={15} className="text-primary" />
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Visitantes que tú contactaste</p>
                <span className="ml-auto text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">{OUTGOING_CONTACTS.length}</span>
              </div>
              {OUTGOING_CONTACTS.map(c => <ContactRow key={c.id} contact={c} type="outgoing" />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
