import { PrismaService } from '../prisma/prisma.service';
import { TransactionType, Currency } from '@prisma/client';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    logTransaction(tx: any, playerId: string, type: TransactionType, amount: number, currency: Currency, reason: string, reference?: string): Promise<any>;
    getPlayerTransactions(userId: string, page?: number, limit?: number): Promise<{
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
    getTransactionHistory(userId: string, currency?: Currency): Promise<{
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
