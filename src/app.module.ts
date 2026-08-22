import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { EconomyModule } from './economy/economy.module';
import { InventoryModule } from './inventory/inventory.module';
import { ClansModule } from './clans/clans.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    PlayersModule,
    EconomyModule,
    InventoryModule,
    ClansModule,
    TransactionsModule,
  ],
})
export class AppModule {}
