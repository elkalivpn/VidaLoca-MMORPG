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
exports.EconomyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const transactions_service_1 = require("../transactions/transactions.service");
let EconomyService = class EconomyService {
    prisma;
    transactionsService;
    constructor(prisma, transactionsService) {
        this.prisma = prisma;
        this.transactionsService = transactionsService;
    }
    async addEuros(userId, amount, reason, reference) {
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const player = await tx.player.update({
                where: { userId },
                data: { euros: { increment: amount } },
            });
            await this.transactionsService.logTransaction(tx, userId, 'EARN', amount, 'EUR', reason, reference);
            return player;
        });
    }
    async spendEuros(userId, amount, reason, reference) {
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const player = await tx.player.findUnique({ where: { userId } });
            if (!player || player.euros < amount) {
                throw new common_1.BadRequestException('Insufficient euros');
            }
            const updatedPlayer = await tx.player.update({
                where: { userId },
                data: { euros: { decrement: amount } },
            });
            await this.transactionsService.logTransaction(tx, userId, 'SPEND', amount, 'EUR', reason, reference);
            return updatedPlayer;
        });
    }
    async addVidaCoins(userId, amount, reason, reference) {
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const player = await tx.player.update({
                where: { userId },
                data: { vidaCoins: { increment: amount } },
            });
            await this.transactionsService.logTransaction(tx, userId, 'EARN', amount, 'VIDACOIN', reason, reference);
            return player;
        });
    }
    async spendVidaCoins(userId, amount, reason, reference) {
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const player = await tx.player.findUnique({ where: { userId } });
            if (!player || player.vidaCoins < amount) {
                throw new common_1.BadRequestException('Insufficient VidaCoins');
            }
            const updatedPlayer = await tx.player.update({
                where: { userId },
                data: { vidaCoins: { decrement: amount } },
            });
            await this.transactionsService.logTransaction(tx, userId, 'SPEND', amount, 'VIDACOIN', reason, reference);
            return updatedPlayer;
        });
    }
    async getBalance(userId) {
        const player = await this.prisma.player.findUnique({
            where: { userId },
            select: { euros: true, vidaCoins: true },
        });
        if (!player) {
            throw new common_1.BadRequestException('Player not found');
        }
        return { euros: player.euros, vidaCoins: player.vidaCoins };
    }
    async purchaseWithVidaCoins(userId, amount, item) {
        return this.spendVidaCoins(userId, amount, `Purchase: ${item}`, `purchase_${Date.now()}`);
    }
    async purchaseWithEuros(userId, amount, item) {
        return this.spendEuros(userId, amount, `Purchase: ${item}`, `purchase_${Date.now()}`);
    }
};
exports.EconomyService = EconomyService;
exports.EconomyService = EconomyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        transactions_service_1.TransactionsService])
], EconomyService);
//# sourceMappingURL=economy.service.js.map