import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(req: any): Promise<{
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
    addItem(req: any, templateId: string, quantity?: number): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    removeItem(req: any, itemId: string, quantity?: number): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    equipItem(req: any, itemId: string): Promise<{
        id: string;
        playerId: string;
        templateId: string;
        quantity: number;
        equipped: boolean;
        acquiredAt: Date;
    }>;
    addWeapon(req: any, name: string, damage: number, range: number, accuracy: number): Promise<{
        id: string;
        name: string;
        playerId: string;
        equipped: boolean;
        damage: number;
        range: number;
        accuracy: number;
    }>;
    equipWeapon(req: any, weaponId: string): Promise<{
        id: string;
        name: string;
        playerId: string;
        equipped: boolean;
        damage: number;
        range: number;
        accuracy: number;
    }>;
}
