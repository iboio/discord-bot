import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ConstantService implements OnModuleInit {
  private botProfileURL: string | null = null;

  constructor(private readonly redisService: RedisService) {}

  readonly logChannelChoice = [
    'Deleted Message',
    'Edited Message',
    'Voice Event',
  ];

  readonly logChannelType = {
    DELETE: 'deleted-message',
    EDIT: 'edit-message',
    VOICE: 'voice-event',
  };

  mapToDiscordChannelType(logType: string): string | null {
    switch (logType) {
      case 'Deleted Message':
        return this.logChannelType.DELETE;
      case 'Edited Message':
        return this.logChannelType.EDIT;
      case 'Voice Event':
        return this.logChannelType.VOICE;
      default:
        return null;
    }
  }

  readonly RedisConfigDB = 'db1';

  async onModuleInit() {
    this.botProfileURL = await this.redisService.stringGet(
      this.RedisConfigDB,
      'botProfileURL',
    );
  }

  getBotProfileURL(): string | null {
    return this.botProfileURL;
  }
}
