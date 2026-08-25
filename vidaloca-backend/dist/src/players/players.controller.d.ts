import { PlayersService } from './players.service';
export declare class PlayersController {
    private playersService;
    constructor(playersService: PlayersService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        level: number;
        money: number;
        vidacoins: number;
        status: import("@prisma/client").$Enums.PlayerStatus;
        currentCity: string;
        userId: string;
    }[]>;
}
