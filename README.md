# EventApp - Plataforma de Gestión de Eventos con IA

Plataforma SaaS moderna para gestión de eventos con networking inteligente, navegación indoor y analíticas en tiempo real.

## Stack Tecnológico

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS + Shadcn/UI
- **Backend:** Server Actions + Drizzle ORM
- **Base de Datos:** Neon PostgreSQL (Serverless)
- **Auth:** NextAuth.js
- **Deploy:** Vercel

## Funcionalidades

### Para Asistentes
- Registro con perfilado progresivo
- Agenda inteligente con detección de conflictos
- Networking con IA (matchmaking estilo Tinder)
- Navegación indoor con beacons
- Gamificación con puntos y leaderboards

### Para Organizadores
- Dashboard con métricas en tiempo real
- Mapas de calor de asistencia
- Gestión de agenda y speakers
- Exportación de datos

## Arquitectura

```
src/
├── app/                  # Páginas Next.js (App Router)
├── features/             # Feature-Sliced Design
│   ├── registration/     # Registro de asistentes
│   ├── agenda/           # Agenda inteligente
│   ├── networking/       # Matchmaking con IA
│   ├── navigation/       # Navegación indoor
│   └── analytics/        # Dashboard organizadores
└── shared/
    ├── db/               # Schema + RLS policies
    └── lib/              # Auth + utilities
```

## Seguridad

- **Multi-Tenant:** Row-Level Security (RLS) a nivel de base de datos
- **Aislamiento:** Cada organizador tiene datos completamente separados
- **Auth:** JWT con NextAuth.js

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/eventapp-saas.git
cd eventapp-saas

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar migraciones
npx drizzle-kit push

# Iniciar desarrollo
npm run dev
```

## Variables de Entorno

```env
# Base de datos (Neon)
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Integraciones (opcionales)
SENDGRID_API_KEY=...
STRIPE_SECRET_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

```bash
vercel
```

## Licencia

MIT
