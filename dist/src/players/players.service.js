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
    async getPlayerByUserId(userId) {
        const player = await this.prisma.player.findUnique({
            where: { userId },
            include: {
                inventory: { include: { template: true } },
                vehicles: { include: { template: true } },
                properties: { include: { template: true } },
                weapons: true,
                clanMember: { include: { clan: true } },
                skills: { include: { skill: true } },
                battlePass: { include: { season: true } },
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return player;
    }
    async updatePlayerLocation(userId, locationId) {
        return this.prisma.player.update({
            where: { userId },
            data: { locationId },
        });
    }
    async addXp(userId, xp) {
        const player = await this.prisma.player.findUnique({
            where: { userId },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        const newXp = player.xp + xp;
        const newLevel = Math.floor(newXp / 1000) + 1;
        return this.prisma.player.update({
            where: { userId },
            data: {
                xp: newXp,
                level: newLevel > player.level ? newLevel : player.level,
            },
        });
    }
    async addReputation(userId, reputation) {
        return this.prisma.player.update({
            where: { userId },
            data: { reputation: { increment: reputation } },
        });
    }
    async setOnlineStatus(userId, isOnline) {
        return this.prisma.player.updateMany({
            where: { userId },
            data: { isOnline, lastLogin: isOnline ? new Date() : undefined },
        });
    }
    async getAllPlayers(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [players, total] = await Promise.all([
            this.prisma.player.findMany({
                skip,
                take: limit,
                include: {
                    user: { select: { username: true, email: true } },
                    clanMember: { include: { clan: { select: { name: true, tag: true } } } },
                },
                orderBy: { level: 'desc' },
            }),
            this.prisma.player.count(),
        ]);
        return { players, total, page, totalPages: Math.ceil(total / limit) };
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map