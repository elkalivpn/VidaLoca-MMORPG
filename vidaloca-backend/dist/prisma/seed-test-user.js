"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Iniciando seed de usuario de pruebas...');
    const email = 'tester@vidaloca.com';
    const passwordPlain = 'VidaLoca2024!';
    const username = 'ElKaliTester';
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        console.log(`⚠️ El usuario ${email} ya existe.`);
        return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(passwordPlain, saltRounds);
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: passwordHash,
            role: 'PLAYER',
            player: {
                create: {
                    level: 1,
                    experience: 0,
                    money: 1000,
                    vidacoins: 500,
                    status: 'OFFLINE',
                    currentCity: 'Madrid',
                    health: 100,
                    maxHealth: 100,
                    stamina: 100,
                    maxStamina: 100,
                    strength: 10,
                    agility: 10,
                    intelligence: 10,
                    charisma: 10,
                    reputation: 0,
                    respect: 0,
                    wantedLevel: 0,
                    battlePassLevel: 1,
                    battlePassXp: 0,
                    hasPremiumBP: false,
                },
            },
        },
        include: {
            player: true,
        },
    });
    console.log('✅ Usuario de pruebas creado exitosamente:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Password: ${passwordPlain}`);
    console.log(`   User ID: ${user.id}`);
    console.log(`   Player ID: ${user.player?.id}`);
    console.log(`   VidaCoins: ${user.player?.vidacoins}`);
    console.log(`   Euros: ${user.player?.money}`);
}
main()
    .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed-test-user.js.map