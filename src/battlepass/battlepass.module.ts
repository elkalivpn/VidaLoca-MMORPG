import { Module } from '@nestjs/common';
import { BattlePassController } from './battlepass.controller';
import { BattlePassService } from './battlepass.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BattlePassController],
  providers: [BattlePassService],
  exports: [BattlePassService],
})
export class BattlePassModule {}
