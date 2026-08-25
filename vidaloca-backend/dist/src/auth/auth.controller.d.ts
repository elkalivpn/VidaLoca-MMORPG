import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            email: string;
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
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            email: string;
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
        };
    }>;
}
