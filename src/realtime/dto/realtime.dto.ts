export class ChatMessageDto {
  content: string;
  zone?: string;
}

export class ZoneJoinDto {
  zone: string;
}

export class WorldEventDto {
  type: string;
  payload: Record<string, unknown>;
  zone?: string;
}
