# AGENTS.md - Pawners / petmatch

Guia operativa para nuevas sesiones de Codex. Este archivo complementa `README.md`: el README explica el producto y el setup general; este documento conserva contexto tecnico y de producto para continuar desarrollo sin romper lo existente.

Ultima auditoria de codigo para este archivo: 2026-07-06.

## Proposito y Modelo de Negocio

Pawners es un marketplace chileno para conectar familias/dueños de mascotas con cuidadores. La propuesta repetida en el README y en la UI es: "No somos una agencia, somos una comunidad".

Modelo declarado en el repositorio:

- Los cuidadores usan la plataforma gratis y conservan el 100% de sus tarifas.
- Las familias pueden explorar perfiles gratis.
- El README y la knowledge base del backend describen un modelo Premium para dueños: Premium permite iniciar conversaciones y reduce la tarifa de servicio de reservas al 3%; Free paga 15% en los casos permitidos.
- La UI publica actual tambien presenta una variante "paga solo cuando conectas", con tarifa unica para desbloquear contacto/WhatsApp en algunos flujos. Esto convive con textos y backend que todavia hablan de suscripcion Premium. No asumir que el modelo de precios esta cerrado.

## Arquitectura Actual

El proyecto esta dividido en tres carpetas principales:

```text
.
├── README.md
├── AGENTS.md
├── backend/
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── src/
│       ├── controllers/
│       ├── knowledge-base/
│       ├── middlewares/
│       ├── rag/
│       ├── routes/
│       ├── server.js
│       └── utils/
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json
│   └── .vercel/
└── supabase/
    └── config.toml
```

No hay `.git` en la raiz auditada. Esta copia local no es un checkout Git, por lo que no se puede hacer `git status`, commit o push desde aqui sin inicializar/clonar el repo correcto.

## Stack Tecnologico

Backend:

- Node.js con ESM (`"type": "module"`).
- Express 4.
- Prisma ORM 5 sobre PostgreSQL.
- `bcrypt` para hashing de password en el backend propio.
- `jsonwebtoken` para JWT propio.
- `helmet` y `cors`.
- `@google/generative-ai` para PetBot/Gemini.
- `mercadopago` esta instalado, pero el controlador actual solo procesa un webhook simple con Prisma; no usa el SDK.
- `zod` esta instalado pero no se usa en los controladores actuales.

Frontend:

- React 18.
- Vite 5.
- React Router DOM 6.
- Tailwind CSS 3.
- Zustand.
- Lucide React.
- `@supabase/supabase-js`.
- `@mercadopago/sdk-react`.

Servicios externos configurados o mencionados:

- Supabase: usado por frontend para Auth y `profiles`; existe `supabase/config.toml`.
- PostgreSQL: datasource Prisma del backend.
- Mercado Pago: widgets frontend y webhook backend; algunos flujos llaman una Edge Function hardcodeada.
- Gemini: backend PetBot usa `GEMINI_API_KEY` aunque no esta listado en `.env.example`.
- Vercel: `frontend/.vercel/project.json` enlaza el proyecto Vercel `frontend`; deploy actual se ha hecho por CLI, no por Git.
- Render/Railway/Neon/Supabase DB se mencionan como opciones de despliegue en README, pero no hay configuracion concreta para backend PaaS en el repo.

## Base de Datos y Migraciones

La fuente de verdad del esquema backend es `backend/prisma/schema.prisma`.

No existe carpeta `backend/prisma/migrations/`. El README indica usar `npx prisma db push`, por lo que el estado actual no usa migraciones versionadas de Prisma.

Datasource:

- `provider = "postgresql"`
- `url = env("DATABASE_URL")`

Enums:

- `Role`: `owner`, `caregiver`, `both`
- `ProfileVisibility`: `public`, `private`
- `PetSpecies`: `dog`, `cat`, `bird`, `rabbit`, `reptile`, `other`
- `PetSize`: `small`, `medium`, `large`, `xlarge`
- `ServiceType`: `walking`, `boarding`, `daycare`, `home_visit`, `overnight`, `exotic_care`
- `PriceUnit`: `hour`, `day`, `night`, `visit`
- `BookingStatus`: `pending`, `accepted`, `rejected`, `completed`, `cancelled`
- `PlanType`: `free`, `premium`
- `BillingCycle`: `monthly`, `quarterly`, `annual`
- `SubscriptionStatus`: `active`, `cancelled`, `expired`, `trial`
- `PaymentType`: `subscription`, `booking`
- `PaymentGateway`: `mercadopago`, `stripe`
- `ReportStatus`: `pending`, `reviewed`, `resolved`

Modelos principales:

- `User` (`users`): email unico, hash de password, rol, nombre, telefono, avatar, comuna/region, flags de identidad/email verificada, visibilidad, timestamps y relaciones con mascotas, perfil cuidador, suscripciones, pagos, reservas, conversaciones, favoritos, mensajes, reviews, reportes, badges y notificaciones.
- `Pet` (`pets`): pertenece a `User` owner; datos de especie, raza, edad, tamaño, necesidades y notas.
- `CaregiverProfile` (`caregiver_profiles`): uno a uno con `User`; bio, experiencia, documento de identidad, estado de background check, rating/reviews, tiempos de respuesta, flags de supersitter/favorito.
- `Listing` (`listings`): pertenece a `CaregiverProfile`; titulo, descripcion, arrays PostgreSQL `services`, `pet_types_accepted`, `zones`, `photos`, flags `featured`/`active`, timestamps.
- `ListingPrice` (`listing_prices`): precio por listing, tipo de servicio y unidad.
- `Availability` (`availability`): disponibilidad por fecha y slots.
- `Booking` (`bookings`): owner, caregiver, listing, pet opcional, fechas, tipo de servicio, estado, subtotal, porcentaje/monto de fee, total, payment status.
- `Review` (`reviews`): rating/comentario vinculado a booking, reviewer y reviewed.
- `Conversation` (`conversations`): owner, caregiver, iniciado por, timestamps y mensajes.
- `Message` (`messages`): contenido, sender, read flag.
- `Subscription` (`subscriptions`): user, plan, ciclo, monto, estado, fechas, auto renew, `mp_subscription_id`.
- `Payment` (`payments`): user, tipo, reference id, transaction id, monto, status y gateway.
- `Favorite` (`favorites`): owner/cuidador con unique compuesto.
- `Badge`, `Notification`, `Report`.

Seed:

- `backend/prisma/seed.js` borra todos los usuarios con `prisma.user.deleteMany({})`; por cascadas esto puede limpiar gran parte de datos relacionados.
- Crea un owner `owner@test.com` con password `password123`.
- Crea cuidadores `maria@test.com`, `carlos@test.com`, `ana@test.com`, con perfiles, listings y prices.
- Solo debe usarse en desarrollo/local.

Supabase:

- Existe `supabase/config.toml` para entorno local Supabase con auth, storage, realtime y edge runtime habilitados.
- No se encontraron migraciones SQL, seed SQL ni Edge Functions dentro de `supabase/`.
- `supabase/config.toml` tiene `[db.seed].sql_paths = ["./seed.sql"]`, pero `supabase/seed.sql` no existe en esta copia.
- El frontend espera una tabla Supabase `profiles`; esa tabla no esta definida en este repo.

## Backend API

Entrada principal: `backend/src/server.js`.

- Aplica `helmet()`.
- CORS usa `process.env.FRONTEND_URL || 'http://localhost:5173'`.
- Usa `express.json()`.
- Monta rutas bajo `/api`.
- Error handler global devuelve 500 generico.
- Puerto por defecto: `4000`.

Rutas en `backend/src/routes/api.js`:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/listings`
- `POST /api/listings` protegido por `authenticate`, `requireRole(['caregiver','both'])`, `requireIdentityVerified`
- `POST /api/conversations` protegido por `authenticate`
- `POST /api/messages` protegido por `authenticate`
- `POST /api/bookings` protegido por `authenticate`
- `POST /api/webhooks/mercadopago`
- `POST /api/bot/chat`

Estado real de controladores:

- Auth backend propio crea usuarios Prisma, hashea password y firma JWT de 7 dias.
- `authenticate` verifica `Authorization: Bearer <jwt>` con `JWT_SECRET`, carga usuario y suscripciones activas, y setea `req.isPremium`.
- Listing search consulta DB real, solo listings activos de usuarios con `profile_visibility = 'public'`, ordenados por `featured desc` y rating desc.
- Listing create crea listing y prices para el caregiver autenticado y verificado, pero no valida payload con Zod.
- Booking create crea una reserva y calcula fee 3%/15% basado en `req.isPremium`, pero confia en `subtotal`, ids y fechas del request.
- Conversations restringe owners no premium al iniciar conversacion, pero asume `owner_id = user.id`.
- Send message valida pertenencia a conversacion.
- Mercado Pago webhook solo atiende `subscription_preapproval`, actualiza subscriptions por `mp_subscription_id` y no verifica firma ni consulta Mercado Pago.
- PetBot lee Markdown de `backend/src/knowledge-base`, inyecta todo el contexto en Gemini `gemini-2.5-flash` y devuelve fallback si falla.

## Autenticacion, Roles y Seguridad

Hay dos sistemas de autenticacion coexistiendo:

1. Backend propio:
   - `User.password_hash`, `bcrypt`, JWT con `JWT_SECRET`.
   - Middleware Express espera token JWT propio.
   - Roles Prisma: `owner`, `caregiver`, `both`.
   - `requireRole` permite el rol solicitado o `both`.
   - `requireIdentityVerified` exige `identity_verified`.

2. Frontend actual:
   - `frontend/src/store/authStore.js` usa Supabase Auth (`signUp`, `signInWithPassword`, `getSession`, `onAuthStateChange`, `signOut`).
   - Carga perfil desde tabla Supabase `profiles`.
   - No usa los endpoints `/api/auth/register` ni `/api/auth/login`.

Implicacion critica: las rutas protegidas del backend no aceptaran automaticamente el access token de Supabase. Para usar backend protegido desde frontend hay que unificar auth o implementar verificacion de JWT Supabase en Express.

Seguridad implementada/parcial:

- Backend: `helmet`, CORS limitado a `FRONTEND_URL`, bcrypt, JWT.
- Frontend: validacion de telefono chileno en registro; `PrivateLayout` protege paneles segun estado Supabase local.
- `MyListing` bloquea informacion de contacto en descripcion con heuristica local.

Riesgos de seguridad conocidos:

- Mercado Pago webhook no verifica `x-signature` ni consulta el evento en API de Mercado Pago.
- Booking confia en datos del cliente.
- No hay rate limiting en Express.
- No hay validacion sistematica de requests pese a tener `zod`.
- Frontend contiene URL hardcodeada de Supabase Edge Function (`https://qfeykjhrsjjwfqtyptod.supabase.co/functions/v1/create-preference`).
- `GEMINI_API_KEY` se usa pero no esta documentada en `.env.example`.
- `CLOUDINARY_URL` esta en `.env.example`, pero no hay uso encontrado en codigo.

## Frontend y Rutas

Entrada: `frontend/src/main.jsx` monta `<App />`.

`frontend/src/App.jsx`:

- Inicializa auth via `useAuthStore().initializeAuth()`.
- Mientras `isLoading`, muestra "Cargando aplicacion...".
- Usa `BrowserRouter`.

Rutas publicas con `PublicLayout`:

- `/` -> `Home`
- `/como-funciona` -> `HowItWorks`
- `/precios` -> `Pricing`
- `/buscar` -> `SearchListings`

Ruta auth:

- `/auth` -> `AuthPage`

Checkout sin layout:

- `/checkout/suscripcion` -> `SubscriptionCheckout`
- `/checkout/reserva` -> `BookingCheckout`
- `/checkout/destacar` -> `CaregiverBoostCheckout`
- `/checkout/contactar-visitante` -> `ContactVisitorCheckout`

Panel privado con `PrivateLayout`:

- Owner: `/panel/owner/onboarding`, `/dashboard`, `/suscripcion`, `/buscar`, `/mascotas`, `/mensajes`, `/reservas`, `/favoritos`, `/perfil`, `/configuracion`
- Caregiver: `/panel/caregiver/onboarding`, `/dashboard`, `/anuncio`, `/contactos`, `/reservas`, `/perfil`, `/configuracion`

Nota: `frontend/src/pages/caregiver/Messages.jsx` existe, pero no esta registrado en `App.jsx`.

## Estado Real de Funcionalidades

Publicas:

- Home: UI nueva con hero full-bleed, buscador por comuna, cards de cuidadores destacados mock, pasos y CTA cuidador. Busca navegando a `/buscar?q=...`.
- SearchListings: UI mejorada, pero usa array mock local de 2 listings. No consume `GET /api/listings`.
- Pricing: UI de precios; textos enfatizan tarifa unica/conexion y cuidador gratis, pero convive con otras pantallas que hablan de Premium mensual.
- HowItWorks: pagina estatica.
- Header/Footer: navegacion publica; algunos links de footer (`/confianza`, `/ganar-dinero`, `/normas`, `/contacto`, `/faq`, `/terminos`, `/privacidad`) no tienen rutas definidas.

Auth:

- AuthPage usa Supabase Auth. Solicita telefono chileno en registro y valida formato.
- `register(email, password, fullName, role, phone)` es llamado con `phone`, pero `authStore.register` solo acepta 4 parametros y no guarda telefono.
- Despues de auth navega por rol metadata a panel owner/caregiver.
- Requiere que exista tabla Supabase `profiles` y que se cree/llene con rol, nombre, email, phone, address/avatar. Eso no esta en el repo.

Owner:

- Dashboard: datos mock y estado `unlockedCaregivers` de Zustand.
- Search: reutiliza `SearchListings` mock.
- BookingCheckout: perfil mock de Ana P.; usa Supabase session y Edge Function hardcodeada para crear preferencia Mercado Pago; tiene estados `isUnlocked`/`isProcessing` que no se conectan al retorno real en el codigo visible.
- SubscriptionCheckout: pago de prueba simulado con `setTimeout` y `alert`; no crea subscription real.
- SubscriptionManager: `isPremium = false` hardcodeado.
- Pets, Bookings, Favorites, Profile, Settings: mayormente datos mock/local; Settings usa `updateUser` local.
- Messages: muestra contactos desbloqueados desde Zustand y links WhatsApp.

Caregiver:

- Dashboard: usa `useCaregiverStore` local y mocks de visitantes/contactos.
- MyListing: editor local Zustand para anuncio, imagenes comprimidas en base64 en cliente, validacion local anti-contacto, pause/delete/create local.
- PublicProfile: preview del anuncio usando Zustand.
- Contacts: listas mock de contactos entrantes/salientes y links WhatsApp.
- Bookings: tabla mock con acciones visuales.
- BoostCheckout: usa Mercado Pago Wallet via Edge Function hardcodeada.
- ContactVisitorCheckout: usa visitante mock, Edge Function hardcodeada y boton dev para simular pago.
- Settings: formularios locales y `alert`; no persiste a backend.
- Onboarding: flujo visual local.

PetBot:

- Backend RAG existe en `/api/bot/chat`.
- Widget frontend `PetBotWidget` no llama backend; simula respuesta con `setTimeout`.
- `PetBotWidget` no se encontro montado en `App.jsx` ni layouts durante auditoria.

## Flujos Criticos del Producto

Busqueda de cuidador:

- Home navega a `/buscar?q=comuna`.
- SearchListings filtra mocks por `searchTerm` y servicio local.
- Backend tiene busqueda real por `GET /api/listings?comuna=&petType=`, pero no esta conectada al frontend.

Registro/login:

- UI usa Supabase Auth.
- Backend tiene endpoints auth propios no usados por UI.
- El panel privado depende del estado de Supabase y de `profiles`.

Contacto/desbloqueo:

- UI de checkout de reserva desbloquea WhatsApp mediante Mercado Pago Wallet si existe `preferenceId`.
- La preferencia se crea en una Supabase Edge Function externa hardcodeada, no versionada aqui.
- Estado de desbloqueo persistente real no esta implementado en el repo; Zustand guarda `unlockedCaregivers` en memoria.

Suscripcion Premium:

- Backend schema/controladores soportan `Subscription` y gating Premium para conversaciones.
- UI SubscriptionCheckout es simulada y SubscriptionManager hardcodea `isPremium = false`.
- No hay flujo completo que cree/active subscription desde frontend hacia backend.

Reservas:

- Backend puede crear Booking protegido por JWT propio.
- Frontend visible usa checkout mock/desbloqueo y no llama `/api/bookings`.

Perfil/anuncio cuidador:

- Backend puede crear listings protegidos.
- Frontend MyListing maneja anuncio local en Zustand y no llama `/api/listings`.

Pagos:

- Frontend usa Mercado Pago Wallet en algunos flujos via Edge Function externa.
- Backend tiene webhook parcial para subscription preapproval.
- No hay conciliacion completa entre pago, desbloqueo, subscription o booking dentro del repo.

## Design System y Convenciones UI

Tailwind:

- Colores extendidos:
  - `primary`: `#5BC0BE`, `dark #3A9A98`, `light #E6F7F7`
  - `secondary`: `#F4A261`, `dark #E76F51`, `light #FAE8D1`
  - `accent`: `#FCA311`
- Fuente configurada: `Inter`, sans-serif. No se verifico import externo de Inter en `index.html`.

Clases component en `frontend/src/index.css`:

- `.btn-primary`
- `.btn-secondary`
- `.btn-outline`

Patrones UI actuales:

- Layout publico: `Header` + contenido + `Footer`.
- Layout privado: sidebar oscuro fijo, topbar, contenido scrollable.
- Uso extensivo de Lucide icons.
- Cards con Tailwind, bordes suaves (`rounded-xl`, `rounded-2xl`, `rounded-3xl`) y sombras suaves.
- Muchos textos y datos son mock en arrays locales.
- Imagenes remotas desde Unsplash y `i.pravatar.cc`.

Componentes reutilizables:

- `Header`
- `Footer`
- `PublicLayout`
- `PrivateLayout`
- `PremiumPaywallModal`
- `PlaceholderPage`
- `PetBotWidget` (no montado actualmente)

Convenciones de codigo observadas:

- Componentes React funcionales.
- Estado global con Zustand para auth y anuncio cuidador.
- Navegacion con `useNavigate` y `Link`.
- Imports relativos.
- No hay TypeScript.
- No hay capa API cliente centralizada.
- No hay tests.
- No hay form library.

## Variables de Entorno

Backend `.env.example`:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_URL`
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_WEBHOOK_SECRET`
- `CLOUDINARY_URL`

Backend variables usadas pero no listadas en `.env.example`:

- `GEMINI_API_KEY` en `backend/src/rag/petBot.js`.

Frontend `.env.example`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Frontend variables usadas pero no listadas en `.env.example`:

- `VITE_MP_PUBLIC_KEY` en checkouts Mercado Pago.

Variables mencionadas en README pero no usadas en codigo frontend actual:

- `VITE_API_URL` aparece en README, pero no se encontro uso en `frontend/src`.

No incluir secretos reales en este archivo ni en commits.

## Integraciones Externas

Supabase:

- Frontend Auth y lectura de `profiles`.
- `supabase/config.toml` para desarrollo local.
- Edge Function externa hardcodeada `create-preference`; no esta versionada aqui.

Mercado Pago:

- `@mercadopago/sdk-react` para `initMercadoPago` y `Wallet`.
- Backend webhook parcial en `/api/webhooks/mercadopago`.

Gemini:

- Backend PetBot con `@google/generative-ai`.
- Modelo configurado como `gemini-2.5-flash`.

Vercel:

- `frontend/.vercel/project.json` enlaza a projectId `prj_8qrPeWENOXNeHbHKSsio6fFo8ZNL`, orgId `team_TtwZREnsUmuwAkk7FSFsmTDD`, projectName `frontend`.
- `frontend/vercel.json` reescribe todo a `/index.html` para SPA.
- Deploy verificado previamente via `npx vercel --prod`, alias `https://frontend-cyan-ten-68.vercel.app`.

## Comandos de Desarrollo, Build y Deploy

Instalar dependencias:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Backend:

```bash
cd backend
npm run dev
npm start
npm run db:push
npm run seed
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

Lint:

```bash
cd frontend
npm run lint
```

Estado real al auditar: `npm run lint` falla porque no existe configuracion ESLint. Aunque `eslint` esta en devDependencies, falta `.eslintrc`/`eslint.config.*`.

Deploy frontend:

```bash
cd frontend
npx vercel --prod
```

Este deploy usa Vercel CLI y metadata local `.vercel`. Como no hay Git checkout, esto no actualiza GitHub.

Backend deploy:

- README sugiere Render/Railway con `npm install && npx prisma generate` y `npm start`.
- No hay archivo de config Render/Railway en el repo.

## Verificaciones Realizadas Recientemente

- `cd frontend && npm run build` pasa.
- El build de Vite emite warning de chunks mayores a 500 kB; no bloquea build.
- `cd backend && node --check src/server.js` paso en una revision previa.
- `cd frontend && npm run lint` falla por falta de config ESLint.
- Produccion Vercel fue desplegada por CLI y verificada en:
  - `https://frontend-cyan-ten-68.vercel.app/`
  - `https://frontend-cyan-ten-68.vercel.app/buscar`

## Deuda Tecnica y Errores Conocidos

Criticos:

- Auth duplicada/desalineada: frontend Supabase vs backend JWT/Prisma.
- Frontend no consume la mayoria de endpoints backend reales.
- No hay migraciones Prisma versionadas.
- No hay schema/migrations SQL para Supabase `profiles`, aunque frontend depende de esa tabla.
- Mercado Pago incompleto y con URL de Edge Function hardcodeada.
- Webhook Mercado Pago sin verificacion de firma.
- Booking backend confia en datos del cliente.

Medios:

- Muchos paneles y flujos usan mocks/local state.
- `phone` del registro se valida en UI pero no se pasa/guarda en Supabase store.
- `PrivateLayout` calcula `role` una vez en `useState`, por ruta o user; si cambia el usuario/rol no recalcula.
- `PetBotWidget` no llama backend y no esta montado.
- `PlaceholderPage` esta importado en `App.jsx` pero no se usa.
- `CaregiverMessages.jsx` existe pero no esta routeado.
- Footer enlaza rutas no existentes.
- No hay tests automatizados.
- No hay cliente API centralizado ni manejo estandar de errores.
- `zod` instalado pero sin uso.
- `CLOUDINARY_URL` esta documentado pero no hay integracion Cloudinary.

Menores/UI:

- Hay mezcla de copy comercial: Premium mensual vs pago unico por conexion.
- Algunas paginas usan emojis; otras usan Lucide. Mantener consistencia al tocar UI.
- Muchas imagenes vienen de servicios externos; considerar fallbacks si se vuelve producto real.

Soluciones/aportes ya aplicados recientemente:

- Home publico fue rediseñado con hero full-bleed, buscador protagonista, trust chips, stats, cuidadores destacados y CTA cuidador.
- SearchListings fue rediseñado con header, buscador, filtros, chips y cards mas completas.
- Ambos cambios fueron desplegados a Vercel por CLI.

## Funcionalidades Pendientes

Desde README:

- Chat en tiempo real con Socket.io.
- PetBot RAG completo conectado al frontend.
- API externa de identidad civil.
- PWA.
- SSR/Next.js para SEO local.

Desde auditoria del codigo:

- Decidir sistema de auth final: Supabase Auth o JWT/Prisma propio.
- Conectar frontend a backend real o mover toda la persistencia a Supabase de forma consistente.
- Versionar schema Supabase requerido (`profiles`, Edge Functions, storage policies) si Supabase sigue siendo fuente de auth/pagos.
- Implementar CRUD real de pets, listings, favorites, bookings, contacts, conversations, subscriptions.
- Implementar pagos end-to-end con verificacion server-side.
- Implementar tests y lint.
- Añadir validacion Zod o equivalente para endpoints backend.
- Crear migraciones Prisma si backend sigue usando Prisma.
- Documentar/implementar deployment backend.

## Restricciones Importantes

No modificar sin autorizacion explicita:

- Modelo de negocio/precios definitivo (Premium mensual vs pago unico por contacto); actualmente esta inconsistente y requiere decision de producto.
- Sistema de autenticacion final; unificarlo tiene alto impacto.
- Schema Prisma o estructura Supabase de produccion.
- Webhooks/pagos Mercado Pago en produccion.
- Vercel project linkage en `frontend/.vercel/project.json`.
- URLs y configuracion de Supabase/Vercel productivas.
- Seed que borra usuarios: no ejecutarlo contra DB no local.
- Cualquier archivo de entorno con secretos reales (`.env`, `.env.local`).

Cuando se trabaje UI:

- Mantener links/rutas existentes salvo que el usuario pida cambiarlas.
- No reemplazar flujos mock con llamadas reales sin revisar auth y permisos.
- Verificar responsive desktop/movil antes de desplegar.

Cuando se trabaje backend:

- No asumir que el token Supabase es valido para `authenticate`.
- No confiar en payload del cliente para precios, ownership o permisos.
- Preferir validacion estructurada; `zod` ya esta instalado.

## Checklist Para Una Nueva Sesion de Codex

Antes de modificar codigo:

1. Leer `README.md` y este `AGENTS.md`.
2. Confirmar objetivo del usuario: UI/demo, integracion real, backend, deploy o docs.
3. Revisar si la carpeta sigue sin `.git`; si el usuario pide GitHub, pedir/ubicar repo remoto correcto.
4. Revisar estado local relevante:
   - `find . -maxdepth 3 -type f -not -path '*/node_modules/*' -not -path '*/dist/*'`
   - `cd frontend && npm run build`
   - backend syntax check si se toca backend.
5. Identificar si el cambio toca mocks o persistencia real.
6. Si toca auth, decidir explicitamente Supabase vs JWT/Prisma antes de implementar.
7. Si toca pagos, no cambiar produccion sin verificar firma/webhooks y variables.
8. Si toca DB, confirmar si se usara Prisma `db push`, migraciones Prisma o Supabase SQL.
9. Para UI, revisar `tailwind.config.js`, `index.css`, layouts y componentes existentes.
10. Para deploy frontend, usar `cd frontend && npx vercel --prod` solo si el usuario pide publicar.
11. Despues de cambios, correr `npm run build` en frontend; documentar si lint sigue fallando por config ausente.
12. Nunca incluir secretos en respuestas, commits o archivos.

## Recomendacion Tecnica Principal

El mayor riesgo del proyecto no es visual sino de arquitectura: hay dos backends de identidad/datos conviviendo. Antes de avanzar con funcionalidades reales, elegir una direccion:

- Opcion A: Supabase como auth/base principal, y Express solo para servicios server-side especiales.
- Opcion B: Prisma/PostgreSQL/Express como backend principal, y remover o limitar Supabase del frontend.

Hasta tomar esa decision, mantener cambios de UI y prototipo separados de cambios de persistencia real.
