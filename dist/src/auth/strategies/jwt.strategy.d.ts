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
        id: string;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.UserRole;
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
        } | null;
    }>;
}
export {};
