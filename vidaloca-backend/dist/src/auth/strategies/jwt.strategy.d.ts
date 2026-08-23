import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: any): Promise<{
        player: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: number;
            experience: number;
            money: number;
            vidacoins: number;
            status: import("@prisma/client").$Enums.PlayerStatus;
            currentCity: string;
            health: number;
            maxHealth: number;
            stamina: number;
            maxStamina: number;
            strength: number;
            agility: number;
            intelligence: number;
            charisma: number;
            reputation: number;
            respect: number;
            wantedLevel: number;
            clanId: string | null;
            clanRole: string | null;
            battlePassLevel: number;
            battlePassXp: number;
            hasPremiumBP: boolean;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        username: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        lastLogin: Date | null;
    }>;
}
export {};
