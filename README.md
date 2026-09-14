# 🌆 VidaLoca MMORPG

> **Mundo libre. Tú decides quién eres.**

MMORPG de navegador ambientado en las grandes ciudades de España. Vive la vida que quieras: empresario de lujo en Marbella, rey de la calle en Madrid, o lo que tu imaginación y tus decisiones permitan.

**Demo**: [vida-loca-mmorpg.vercel.app](https://vida-loca-mmorpg.vercel.app)

---

## ✨ Filosofía del juego

- Mundo abierto realista con ciudades españolas
- Economía dual: **Euros** (dinero del mundo) + **VidaCoins** (moneda premium)
- Clanes, territorios y control de barrios
- Vehículos de lujo, armas, propiedades, misiones y battle pass
- Progresión por decisiones, no por grindeo ciego
- Tú eliges tu camino: legal, gris o completamente ilegal

---

## 🏗️ Stack

| Capa | Tecnología |
|------|------------|
| Backend | NestJS 11 + TypeScript |
| ORM / DB | Prisma + PostgreSQL |
| Auth | JWT + RolesGuard |
| Realtime | Socket.IO (`/game`) |
| Cache | Redis (opcional) |
| Frontend | Next.js 15 + Tailwind + Zustand |

### Módulos implementados (Fases 0-3)
- `auth`, `players`, `economy`, `inventory`, `clans`, `transactions`, `health`
- `missions`, `vehicles`, `properties`, `skills`, `achievements`, `battle-pass`
- `realtime` – presence por zona, chat zona/global, world events

---

## 🚀 Cómo arrancar

### Requisitos
- Node.js 20+
- PostgreSQL (local vía Docker o Neon)
- Redis (recomendado)

### 1. Clonar e instalar
```bash
git clone https://github.com/elkalivpn/VidaLoca-MMORPG.git
cd VidaLoca-MMORPG
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env
# Edita .env con tu DATABASE_URL y un JWT_SECRET fuerte
```

### 3. Docker (Postgres + Redis)
```bash
docker compose up -d
```

### 4. Base de datos
```bash
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### 5. Backend
```bash
npm run start:dev
```
- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api/docs`
- WebSocket: `ws://localhost:3000/game`

### 6. Cliente (Next.js)
```bash
cd client
npm install
npm run dev
```
Abre `http://localhost:3001`

### Usuario de prueba (seed)
- Email: `admin@vidaloca.com`
- Password: `Admin123!`

---

## 🛡️ Seguridad

- `.env` **nunca** se sube al repositorio (solo `.env.example`)
- Rate limiting global (Throttler)
- ValidationPipe estricto
- Passwords con bcrypt
- JWT + RolesGuard

---

## 🗺️ Roadmap

Ver `DEVELOPMENT_PLAN.md`

1. **Fase 0** – Fundación y seguridad ✅
2. **Fase 1** – Backend gameplay completo ✅
3. **Fase 2** – Cliente jugable ✅
4. **Fase 3** – Multiplayer realtime ✅
5. **Fase 4** – Clanes UI, inventario visual, más narrativa (en curso)
6. **Fase 5** – Producción y escalabilidad

---

## 🤝 Contribuir

Pull requests bienvenidos. Mantén la filosofía: **libertad del jugador primero**.

---

Hecho con ❤️ para los que quieren vivir su propia vida loca.
