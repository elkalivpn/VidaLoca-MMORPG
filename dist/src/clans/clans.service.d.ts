import { PrismaService } from '../prisma/prisma.service';
export declare class ClansService {
    private prisma;
    constructor(prisma: PrismaService);
    createClan(userId: string, name: string, tag: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        level: number;
        xp: number;
        tag: string;
        leaderId: string;
        funds: number;
    }>;
    getClanByUserId(userId: string): Promise<({
        members: ({
            player: {
                user: {
                    id: string;
                    email: string;
                    username: string;
                    password: string;
                    role: import("@prisma/client").$Enums.UserRole;
                    createdAt: Date;
                    updatedAt: Date;
                };
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
            };
        } & {
            id: string;
            role: import("@prisma/client").$Enums.ClanRole;
            playerId: string;
            clanId: string;
            joinedAt: Date;
        })[];
        territories: {
            id: string;
            clanId: string;
            territoryId: string;
            capturedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        level: number;
        xp: number;
        tag: string;
        leaderId: string;
        funds: number;
    }) | null>;
    joinClan(userId: string, clanId: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.ClanRole;
        playerId: string;
        clanId: string;
        joinedAt: Date;
    }>;
    leaveClan(userId: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.ClanRole;
        playerId: string;
        clanId: string;
        joinedAt: Date;
    }>;
    getClanLeaderboard(page?: number, limit?: number): Promise<{
        clans: ({
            members: ({
                player: {
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
                };
            } & {
                id: string;
                role: import("@prisma/client").$Enums.ClanRole;
                playerId: string;
                clanId: string;
                joinedAt: Date;
            })[];
            territories: {
                id: string;
                clanId: string;
                territoryId: string;
                capturedAt: Date;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            level: number;
            xp: number;
            tag: string;
            leaderId: string;
            funds: number;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
}
