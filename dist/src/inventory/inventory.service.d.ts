import { PrismaService } from '../prisma/prisma.service';
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getPlayerInventory(userId: string): Promise<{
        inventory: ({
            template: {
                id: string;
                name: string;
                priceVida: number | null;
                priceEuros: number | null;
                description: string;
                type: import("@prisma/client").$Enums.ItemType;
                rarity: import("@prisma/client").$Enums.Rarity;
                stats: import("@prisma/client/runtime/client").JsonValue | null;
            };
        } & {
            id: string;
            playerId: string;
            templateId: string;
            quantity: number;
            equipped: boolean;
            acquiredAt: Date;
        })[];
        weapons: {
            id: string;
            name: string;
            playerId: string;
            equipped: boolean;
            damage: number;
            range: number;
            accuracy: number;
        }[];
    }>;
    addItemToInventory(userId: string, templateId: string, quantity?: number): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    removeItemFromInventory(userId: string, itemId: string, quantity?: number): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    equipItem(userId: string, itemId: string): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    addWeapon(userId: string, name: string, damage: number, range: number, accuracy: number): Promise<{
        id: string;
        name: string;
        playerId: string;
        equipped: boolean;
        damage: number;
        range: number;
        accuracy: number;
    }>;
    equipWeapon(userId: string, weaponId: string): Promise<{
        id: string;
        name: string;
        playerId: string;
        equipped: boolean;
        damage: number;
        range: number;
        accuracy: number;
    }>;
}
