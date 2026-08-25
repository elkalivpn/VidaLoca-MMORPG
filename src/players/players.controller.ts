import { Controller, Get, Post, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('players')
@UseGuards(AuthGuard('jwt'))
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get('me')
  async getMyPlayer(@Req() req) {
    return this.playersService.getPlayerByUserId(req.user.id);
  }

  @Get()
  async getAllPlayers(@Query('page') page: string = '1', @Query('limit') limit: string = '20') {
    return this.playersService.getAllPlayers(parseInt(page), parseInt(limit));
  }

  @Post('location')
  async updateLocation(@Req() req, @Body('locationId') locationId: string) {
    return this.playersService.updatePlayerLocation(req.user.id, locationId);
  }

  @Post('xp')
  async addXp(@Req() req, @Body('xp') xp: number) {
    return this.playersService.addXp(req.user.id, xp);
  }

  @Post('reputation')
  async addReputation(@Req() req, @Body('reputation') reputation: number) {
    return this.playersService.addReputation(req.user.id, reputation);
  }
}
