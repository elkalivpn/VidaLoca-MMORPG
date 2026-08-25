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
exports.ClansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClansService = class ClansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createClan(userId, name, tag) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player)
            throw new common_1.NotFoundException('Player not found');
        const existingClan = await this.prisma.clan.findFirst({
            where: { OR: [{ name }, { tag }] },
        });
        if (existingClan)
            throw new common_1.BadRequestException('Clan name or tag already exists');
        return this.prisma.$transaction(async (tx) => {
            const clan = await tx.clan.create({
                data: { name, tag, leaderId: player.id, funds: 0 },
            });
            await tx.clanMember.create({
                data: { playerId: player.id, clanId: clan.id, role: 'LEADER' },
            });
            return clan;
        });
    }
    async getClanByUserId(userId) {
        const member = await this.prisma.clanMember.findUnique({
            where: { playerId: userId },
            include: { clan: { include: { members: { include: { player: { include: { user: true } } } }, territories: true } } },
        });
        return member?.clan || null;
    }
    async joinClan(userId, clanId) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player)
            throw new common_1.NotFoundException('Player not found');
        const existingMember = await this.prisma.clanMember.findUnique({ where: { playerId: userId } });
        if (existingMember)
            throw new common_1.BadRequestException('Already in a clan');
        return this.prisma.clanMember.create({
            data: { playerId: player.id, clanId, role: 'RECRUIT' },
        });
    }
    async leaveClan(userId) {
        const member = await this.prisma.clanMember.findUnique({ where: { playerId: userId } });
        if (!member)
            throw new common_1.NotFoundException('Not in a clan');
        if (member.role === 'LEADER')
            throw new common_1.BadRequestException('Leader must transfer leadership first');
        return this.prisma.clanMember.delete({ where: { id: member.id } });
    }
    async getClanLeaderboard(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [clans, total] = await Promise.all([
            this.prisma.clan.findMany({
                skip, take: limit,
                include: { members: { include: { player: true } }, territories: true },
                orderBy: { level: 'desc' },
            }),
            this.prisma.clan.count(),
        ]);
        return { clans, total, page, totalPages: Math.ceil(total / limit) };
    }
};
exports.ClansService = ClansService;
exports.ClansService = ClansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClansService);
//# sourceMappingURL=clans.service.js.map