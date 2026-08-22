import { TransactionsService } from './transactions.service';
import { Currency } from '@prisma/client';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    getTransactions(req: any, page?: string, limit?: string): Promise<{
        transactions: {
            id: string;
            type: import("@prisma/client").$Enums.TransactionType;
            createdAt: Date;
            playerId: string;
            amount: number;
            currency: import("@prisma/client").$Enums.Currency;
            reason: string;
            reference: string | null;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getHistory(req: any, currency?: Currency): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.TransactionType;
        createdAt: Date;
        playerId: string;
        amount: number;
        currency: import("@prisma/client").$Enums.Currency;
        reason: string;
        reference: string | null;
    }[]>;
}
