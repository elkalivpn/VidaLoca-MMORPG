import { EconomyService } from './economy.service';
export declare class EconomyController {
    private economyService;
    constructor(economyService: EconomyService);
    getBalance(req: any): Promise<{
        euros: number;
        vidaCoins: number;
    }>;
    addEuros(req: any, amount: number, reason: string): Promise<{
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
    spendEuros(req: any, amount: number, reason: string): Promise<{
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
    addVidaCoins(req: any, amount: number, reason: string): Promise<{
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
    spendVidaCoins(req: any, amount: number, reason: string): Promise<{
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
    purchaseWithVidaCoins(req: any, amount: number, item: string): Promise<{
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
    purchaseWithEuros(req: any, amount: number, item: string): Promise<{
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
