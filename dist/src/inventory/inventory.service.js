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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = class InventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlayerInventory(userId) {
        const player = await this.prisma.player.findUnique({
            where: { userId },
            include: {
                inventory: { include: { template: true } },
                weapons: true,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return { inventory: player.inventory, weapons: player.weapons };
    }
    async addItemToInventory(userId, templateId, quantity = 1) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        const template = await this.prisma.itemTemplate.findUnique({
            where: { id: templateId },
        });
        if (!template) {
            throw new common_1.NotFoundException('Item template not found');
        }
        const existingItem = await this.prisma.inventoryItem.findFirst({
            where: { playerId: player.id, templateId },
        });
        if (existingItem) {
            return this.prisma.inventoryItem.update({
                where: { id: existingItem.id },
                data: { quantity: { increment: quantity } },
            });
        }
        return this.prisma.inventoryItem.create({
            data: {
                playerId: player.id,
                templateId,
                quantity,
            },
        });
    }
    async removeItemFromInventory(userId, itemId, quantity = 1) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        const item = await this.prisma.inventoryItem.findFirst({
            where: { id: itemId, playerId: player.id },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item not found in inventory');
        }
        if (item.quantity <= quantity) {
            return this.prisma.inventoryItem.delete({ where: { id: itemId } });
        }
        return this.prisma.inventoryItem.update({
            where: { id: itemId },
            data: { quantity: { decrement: quantity } },
        });
    }
    async equipItem(userId, itemId) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        const item = await this.prisma.inventoryItem.findFirst({
            where: { id: itemId, playerId: player.id },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item not found in inventory');
        }
        await this.prisma.inventoryItem.updateMany({
            where: { playerId: player.id, equipped: true },
            data: { equipped: false },
        });
        return this.prisma.inventoryItem.update({
            where: { id: itemId },
            data: { equipped: true },
        });
    }
    async addWeapon(userId, name, damage, range, accuracy) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return this.prisma.playerWeapon.create({
            data: {
                playerId: player.id,
                name,
                damage,
                range,
                accuracy,
                equipped: false,
            },
        });
    }
    async equipWeapon(userId, weaponId) {
        const player = await this.prisma.player.findUnique({ where: { userId } });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        await this.prisma.playerWeapon.updateMany({
            where: { playerId: player.id, equipped: true },
            data: { equipped: false },
        });
        return this.prisma.playerWeapon.update({
            where: { id: weaponId },
            data: { equipped: true },
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map