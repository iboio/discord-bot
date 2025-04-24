import { Module } from '@nestjs/common';
import { MessageEventLogger } from './logger/message';
import { BotService } from './bot.service';
import { ConstantModule } from '../constant/constant.module';
import { RedisModule } from '../redis/redis.module';
import { VoiceEventLogger } from './logger/voice';

@Module({
  imports: [ConstantModule, RedisModule],
  providers: [MessageEventLogger, BotService, VoiceEventLogger],
  exports: [MessageEventLogger, VoiceEventLogger],
})
export class BotModule {}
