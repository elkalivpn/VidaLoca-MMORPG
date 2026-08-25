import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
        };
    }>;
    logout(userId: string, refreshToken: string): Promise<{
        message: string;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private generateTokens;
    private storeRefreshToken;
    validateUser(userId: string): Promise<{
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
