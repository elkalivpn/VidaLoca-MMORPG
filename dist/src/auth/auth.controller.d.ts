import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    logout(req: any, refreshToken: string): Promise<{
        message: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
