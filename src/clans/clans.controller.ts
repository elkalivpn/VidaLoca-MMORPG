import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ClansService } from './clans.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('clans')
@UseGuards(AuthGuard('jwt'))
export class ClansController {
  constructor(private clansService: ClansService) {}

  @Post('create')
  async createClan(@Req() req, @Body('name') name: string, @Body('tag') tag: string) {
    return this.clansService.createClan(req.user.id, name, tag);
  }

  @Get('my')
  async getMyClan(@Req() req) {
    return this.clansService.getClanByUserId(req.user.id);
  }

  @Post('join/:clanId')
  async joinClan(@Req() req, @Body('clanId') clanId: string) {
    return this.clansService.joinClan(req.user.id, clanId);
  }

  @Post('leave')
  async leaveClan(@Req() req) {
    return this.clansService.leaveClan(req.user.id);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.clansService.getClanLeaderboard();
  }
}
