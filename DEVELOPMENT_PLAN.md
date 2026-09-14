# VidaLoca MMORPG – Plan de Desarrollo

Filosofía: Mundo libre en ciudades españolas. Tú decides quién eres. Economía dual (Euros + VidaCoins). Clanes, territorios, vehículos, propiedades, misiones y Battle Pass.

## Fase 0 – Fundación y Seguridad ✅
- Eliminar secretos del repo (.env → .env.example)
- .gitignore correcto (node_modules, .env, dist)
- Docker Compose (Postgres + Redis)
- Global ValidationPipe, filtros de excepciones, interceptores
- Throttling, Health check, Swagger
- RolesGuard + decoradores
- README profesional

## Fase 1 – Backend completo de gameplay ✅
- Módulos: Missions, Vehicles, Properties, Skills, Achievements, BattlePass
- DTOs validados, servicios con lógica de economía dual
- Seed ampliado (ciudades ES, misiones narrativas, vehículos, props)
- Fix clans playerId/userId

## Fase 2 – Cliente Next.js jugable ✅
- Auth (login/register)
- Dashboard con tabs: Mapa, Misiones, Vehículos, Propiedades, Skills/BP
- CityMap interactivo (ciudades españolas)
- StatsBar (Euros, VidaCoins, nivel, zona)
- Estilo luxury + street

## Fase 3 – Multiplayer realtime ✅
- Socket.IO gateway /game (JWT auth)
- Presence por zona, chat zona + global
- World events
- Client: useRealtime + ChatPanel
- zone:join desde el mapa

## Fase 4 – Clanes, inventario visual y narrativa (en curso)
- UI de clanes y territorios
- Inventario visual de armas/items
- Más misiones narrativas
- Eventos de mundo programados

## Fase 5+ – Polish y escalado
- Combate/PvP ligero, economía de mercado, notificaciones, mobile-first, tests E2E, CI
