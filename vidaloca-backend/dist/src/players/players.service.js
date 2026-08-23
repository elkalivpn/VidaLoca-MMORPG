"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlayersService = class PlayersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.player.create({
            data: {
                userId: data.userId,
                level: 1,
                experience: 0,
                money: 1000,
                vidacoins: 100,
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
        });
    }
    async findByUserId(userId) {
        return this.prisma.player.findUnique({
            where: { userId },
        });
    }
    async findById(id) {
        return this.prisma.player.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return this.prisma.player.update({
            where: { id },
            data,
        });
    }
    async findAll() {
        return this.prisma.player.findMany({
            select: {
                id: true,
                userId: true,
                level: true,
                money: true,
                vidacoins: true,
                currentCity: true,
                status: true,
                createdAt: true,
            },
        });
    }
    async getUserWithPlayer(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                player: true,
            },
        });
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map