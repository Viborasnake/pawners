# 🐾 Pawners - Marketplace de Cuidadores de Mascotas

Pawners es una web app moderna inspirada en el modelo de Babysits, diseñada para conectar familias con cuidadores de mascotas en Chile. 

La filosofía es simple: **No somos una agencia, somos una comunidad**. Los cuidadores usan la plataforma 100% gratis y conservan el 100% de lo que ganan. Las familias (dueños) pueden explorar gratis, pero requieren una suscripción Premium para iniciar nuevas conversaciones y obtener tarifas de protección reducidas en el escrow (3% vs 15%).

## 🏗️ Arquitectura y Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Lucide Icons.
- **Backend:** Node.js, Express, Prisma ORM.
- **Base de Datos:** PostgreSQL.
- **Autenticación:** JWT + bcrypt.
- **Pagos (simulados/listos):** Mercado Pago Webhooks.

---

## 🚀 Guía de Instalación y Desarrollo Local

### 1. Clonar e Instalar
Debes instalar las dependencias tanto en el frontend como en el backend.

```bash
# Backend
cd pawners/backend
npm install

# Frontend
cd pawners/frontend
npm install
```

### 2. Variables de Entorno (.env)
Asegúrate de copiar el archivo de ejemplo en el backend:

```bash
cd pawners/backend
cp .env.example .env
```
Rellena la variable `DATABASE_URL` con tu conexión a PostgreSQL. Por defecto asume una base local:
`postgresql://postgres:postgres@localhost:5432/pawners?schema=public`

### 3. Base de Datos y Seeder
Sincroniza el esquema de Prisma y puebla la base de datos con datos de prueba (dueños y cuidadores destacados):

```bash
cd pawners/backend
npx prisma db push
npm run seed
```

### 4. Levantar los servidores
Abre dos terminales:

**Terminal 1 (Backend):**
```bash
cd pawners/backend
npm run dev
# Correrá en http://localhost:4000
```

**Terminal 2 (Frontend):**
```bash
cd pawners/frontend
npm run dev
# Correrá en http://localhost:5173
```

---

## 🌍 Guía de Despliegue Paso a Paso

Para llevar Pawners a producción, sigue este esquema de arquitectura sin servidor (Serverless / PaaS):

### 1. Base de Datos (Neon o Supabase)
1. Crea un proyecto en [Neon.tech](https://neon.tech) (PostgreSQL Serverless ideal para Prisma).
2. Copia la cadena de conexión generada y colócala en tu `.env` de producción.
3. Ejecuta localmente `npx prisma db push` apuntando a la base de datos de producción.

### 2. Backend (Render o Railway)
1. Conecta tu repositorio de GitHub a [Render](https://render.com).
2. Crea un nuevo "Web Service".
3. **Build Command:** `npm install && npx prisma generate`
4. **Start Command:** `npm start` (que apunta a `node src/server.js`).
5. Configura en el panel de Render todas las variables de entorno (`JWT_SECRET`, `DATABASE_URL`, `MERCADOPAGO_ACCESS_TOKEN`).

### 3. Frontend (Vercel)
1. Conecta el repositorio a [Vercel](https://vercel.com).
2. Configura el **Root Directory** a la carpeta `frontend/`.
3. Configura el framework como `Vite`.
4. En las variables de entorno de Vercel, agrega la URL de tu backend recién publicado en Render (`VITE_API_URL` / `FRONTEND_URL`).

---

## 🗺️ Roadmap de Features Futuras

El Producto Mínimo Viable (MVP) comercial ya está diseñado. Para escalar la plataforma y potenciar la comunidad, estas son las funcionalidades prioritarias recomendadas:

- [ ] **Fase 8 - Chat en Tiempo Real:** Integrar `Socket.io` para que los mensajes de la bandeja de entrada se actualicen de forma instantánea sin requerir recargar la página.
- [ ] **Fase 9 - PetBot RAG (Agente IA):** Implementar a "PetBot" usando LangChain + Gemini API para responder dudas de soporte general leyendo la Knowledge Base interna. *(En desarrollo actualmente)*.
- [ ] **Fase 10 - API Externa de Identidad Civil:** Integración con proveedores locales en Chile para verificación automática y cruzada de Cédulas de Identidad, eliminando la revisión humana manual de la Fase 5.
- [ ] **Fase 11 - App Móvil PWA:** Configurar el *manifest.json* y *service workers* en React para que dueños y cuidadores puedan instalar Pawners como una app en la pantalla de inicio de su teléfono.
- [ ] **Fase 12 - SSR para SEO Dinámico:** Migrar parte de la web pública (como `/cuidadores/providencia`) a **Next.js** para mejorar el renderizado del lado del servidor y liderar las búsquedas locales en Google.

---
*Desarrollado con ❤️ para conectar a las mascotas de Chile.*
