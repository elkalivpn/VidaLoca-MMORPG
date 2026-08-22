import { PlayersService } from './players.service';
export declare class PlayersController {
    private playersService;
    constructor(playersService: PlayersService);
    getMyPlayer(req: any): Promise<{
        vehicles: ({
            template: {
                id: string;
                name: string;
                priceVida: number | null;
                brand: string;
                speed: number;
                handling: number;
                durability: number;
                capacity: number;
                priceEuros: number | null;
            };
        } & {
            id: string;
            playerId: string;
            templateId: string;
            licensePlate: string;
            color: string;
            condition: number;
            isPrimary: boolean;
        })[];
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
        properties: ({
            template: {
                id: string;
                name: string;
                priceVida: number | null;
                capacity: number;
                priceEuros: number;
                type: import("@prisma/client").$Enums.PropertyType;
                location: string;
                security: number;
                rentYield: number | null;
            };
        } & {
            id: string;
            playerId: string;
            templateId: string;
            purchasedAt: Date;
            customized: import("@prisma/client/runtime/client").JsonValue | null;
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
        clanMember: ({
            clan: {
                id: string;
                name: string;
                createdAt: Date;
                level: number;
                xp: number;
                tag: string;
                leaderId: string;
                funds: number;
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.ClanRole;
            playerId: string;
            clanId: string;
            joinedAt: Date;
        }) | null;
        battlePass: ({
            season: {
                id: string;
                name: string;
                seasonNumber: number;
                startDate: Date;
                endDate: Date;
                isActive: boolean;
            };
        } & {
            id: string;
            level: number;
            xp: number;
            playerId: string;
            seasonId: string;
            isPremium: boolean;
            rewardsClaimed: number[];
        }) | null;
        skills: ({
            skill: {
                id: string;
                name: string;
                description: string;
                maxLevel: number;
                category: import("@prisma/client").$Enums.SkillCategory;
            };
        } & {
            id: string;
            level: number;
            xp: number;
            playerId: string;
            skillId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayName: string;
        level: number;
        xp: number;
        reputation: number;
        euros: number;
        vidaCoins: number;
        locationId: string | null;
        isOnline: boolean;
        lastLogin: Date;
        userId: string;
    }>;
    getAllPlayers(page?: string, limit?: string): Promise<{
        players: ({
            user: {
                email: string;
                username: string;
            };
            clanMember: ({
                clan: {
                    name: string;
                    tag: string;
                };
            } & {
                id: string;
                role: import("@prisma/client").$Enums.ClanRole;
                playerId: string;
                clanId: string;
                joinedAt: Date;
            }) | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            displayName: string;
            level: number;
            xp: number;
            reputation: number;
            euros: number;
            vidaCoins: number;
            locationId: string | null;
            isOnline: boolean;
            lastLogin: Date;
            userId: string;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    updateLocation(req: any, locationId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayName: string;
        level: number;
        xp: number;
        reputation: number;
        euros: number;
        vidaCoins: number;
        locationId: string | null;
        isOnline: boolean;
        lastLogin: Date;
        userId: string;
    }>;
    addXp(req: any, xp: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayName: string;
        level: number;
        xp: number;
        reputation: number;
        euros: number;
        vidaCoins: number;
        locationId: string | null;
        isOnline: boolean;
        lastLogin: Date;
        userId: string;
    }>;
    addReputation(req: any, reputation: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayName: string;
        level: number;
        xp: number;
        reputation: number;
        euros: number;
        vidaCoins: number;
        locationId: string | null;
        isOnline: boolean;
        lastLogin: Date;
        userId: string;
    }>;
}
