import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClansService {
  constructor(private prisma: PrismaService) {}

  async createClan(userId: string, name: string, tag: string) {
    const player = await this.prisma.player.findUnique({ where: { userId } });
    if (!player) throw new NotFoundException('Player not found');

    const existingClan = await this.prisma.clan.findFirst({
      where: { OR: [{ name }, { tag }] },
    });
    if (existingClan) throw new BadRequestException('Clan name or tag already exists');

    return this.prisma.$transaction(async (tx) => {
      const clan = await tx.clan.create({
        data: { name, tag, leaderId: player.id, funds: 0 },
      });

      await tx.clanMember.create({
        data: { playerId: player.id, clanId: clan.id, role: 'LEADER' },
      });

      return clan;
    });
  }

  async getClanByUserId(userId: string) {
    const member = await this.prisma.clanMember.findUnique({
      where: { playerId: userId },
      include: { clan: { include: { members: { include: { player: { include: { user: true } } } }, territories: true } } },
    });
    return member?.clan || null;
  }

  async joinClan(userId: string, clanId: string) {
    const player = await this.prisma.player.findUnique({ where: { userId } });
    if (!player) throw new NotFoundException('Player not found');

    const existingMember = await this.prisma.clanMember.findUnique({ where: { playerId: userId } });
    if (existingMember) throw new BadRequestException('Already in a clan');

    return this.prisma.clanMember.create({
      data: { playerId: player.id, clanId, role: 'RECRUIT' },
    });
  }

  async leaveClan(userId: string) {
    const member = await this.prisma.clanMember.findUnique({ where: { playerId: userId } });
    if (!member) throw new NotFoundException('Not in a clan');
    if (member.role === 'LEADER') throw new BadRequestException('Leader must transfer leadership first');

    return this.prisma.clanMember.delete({ where: { id: member.id } });
  }

  async getClanLeaderboard(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [clans, total] = await Promise.all([
      this.prisma.clan.findMany({
        skip, take: limit,
        include: { members: { include: { player: true } }, territories: true },
        orderBy: { level: 'desc' },
      }),
      this.prisma.clan.count(),
    ]);
    return { clans, total, page, totalPages: Math.ceil(total / limit) };
  }
}
