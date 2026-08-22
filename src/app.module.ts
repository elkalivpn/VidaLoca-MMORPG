import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { EconomyModule } from './economy/economy.module';
import { InventoryModule } from './inventory/inventory.module';
import { ClansModule } from './clans/clans.module';
import { MissionsModule } from './missions/missions.module';
import { BattlePassModule } from './battlepass/battlepass.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PropertiesModule } from './properties/properties.module';
import { SkillsModule } from './skills/skills.module';
import { AchievementsModule } from './achievements/achievements.module';
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
    MissionsModule,
    BattlePassModule,
    VehiclesModule,
    PropertiesModule,
    SkillsModule,
    AchievementsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
