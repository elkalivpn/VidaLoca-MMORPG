import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
  playerId?: string;
  zone?: string;
}

@WebSocketGateway({
  namespace: '/game',
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3001'],
    credentials: true,
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);
  private readonly presence = new Map<string, { userId: string; username: string; zone: string; socketId: string }>();

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token =
        (client.handshake.auth?.token as string) ||
        (client.handshake.headers?.authorization as string)?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn(`Client ${client.id} rejected: no token`);
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'change-me-in-production',
      });

      client.userId = payload.sub || payload.userId;
      client.username = payload.username || payload.email || 'Jugador';
      client.playerId = payload.playerId;
      client.zone = 'madrid'; // default

      this.presence.set(client.id, {
        userId: client.userId!,
        username: client.username!,
        zone: client.zone!,
        socketId: client.id,
      });

      client.join(`zone:${client.zone}`);
      client.join('global');

      this.logger.log(`User ${client.username} (${client.userId}) connected to zone ${client.zone}`);

      // Notify zone of new presence
      this.server.to(`zone:${client.zone}`).emit('presence:update', this.getZonePresence(client.zone!));
    } catch (err) {
      this.logger.warn(`Auth failed for ${client.id}: ${(err as Error).message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    const info = this.presence.get(client.id);
    if (info) {
      this.presence.delete(client.id);
      this.server.to(`zone:${info.zone}`).emit('presence:update', this.getZonePresence(info.zone));
      this.logger.log(`User ${info.username} disconnected from zone ${info.zone}`);
    }
  }

  @SubscribeMessage('zone:join')
  handleZoneJoin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { zone: string },
  ) {
    if (!client.userId || !data?.zone) return;

    const oldZone = client.zone;
    if (oldZone) {
      client.leave(`zone:${oldZone}`);
      this.server.to(`zone:${oldZone}`).emit('presence:update', this.getZonePresence(oldZone));
    }

    client.zone = data.zone;
    client.join(`zone:${data.zone}`);

    const entry = this.presence.get(client.id);
    if (entry) {
      entry.zone = data.zone;
    }

    this.server.to(`zone:${data.zone}`).emit('presence:update', this.getZonePresence(data.zone));
    client.emit('zone:joined', { zone: data.zone, presence: this.getZonePresence(data.zone) });

    this.logger.log(`${client.username} moved to zone ${data.zone}`);
  }

  @SubscribeMessage('chat:zone')
  handleZoneChat(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { content: string },
  ) {
    if (!client.userId || !data?.content?.trim() || !client.zone) return;

    const message = {
      id: `${Date.now()}-${client.id}`,
      userId: client.userId,
      username: client.username,
      content: data.content.trim().slice(0, 500),
      zone: client.zone,
      scope: 'zone' as const,
      timestamp: new Date().toISOString(),
    };

    this.server.to(`zone:${client.zone}`).emit('chat:message', message);
  }

  @SubscribeMessage('chat:global')
  handleGlobalChat(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { content: string },
  ) {
    if (!client.userId || !data?.content?.trim()) return;

    const message = {
      id: `${Date.now()}-${client.id}`,
      userId: client.userId,
      username: client.username,
      content: data.content.trim().slice(0, 500),
      zone: client.zone,
      scope: 'global' as const,
      timestamp: new Date().toISOString(),
    };

    this.server.to('global').emit('chat:message', message);
  }

  @SubscribeMessage('world:event')
  handleWorldEvent(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { type: string; payload?: Record<string, unknown>; zone?: string },
  ) {
    // Only allow certain event types from clients; server can broadcast more freely later
    if (!client.userId || !data?.type) return;

    const event = {
      type: data.type,
      payload: data.payload || {},
      zone: data.zone || client.zone,
      from: client.username,
      timestamp: new Date().toISOString(),
    };

    if (data.zone) {
      this.server.to(`zone:${data.zone}`).emit('world:event', event);
    } else {
      this.server.to('global').emit('world:event', event);
    }
  }

  private getZonePresence(zone: string) {
    return Array.from(this.presence.values())
      .filter((p) => p.zone === zone)
      .map(({ userId, username, zone }) => ({ userId, username, zone }));
  }

  /** Broadcast a world event from server-side (e.g. scheduled jobs) */
  broadcastWorldEvent(type: string, payload: Record<string, unknown>, zone?: string) {
    const event = {
      type,
      payload,
      zone: zone || null,
      from: 'system',
      timestamp: new Date().toISOString(),
    };
    if (zone) {
      this.server.to(`zone:${zone}`).emit('world:event', event);
    } else {
      this.server.to('global').emit('world:event', event);
    }
  }
}
