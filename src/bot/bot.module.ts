import { Module } from '@nestjs/common';
import { MessageEventLogger } from './logger/message';
import { BotService } from './bot.service';
import { ConstantModule } from '../constant/constant.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [ConstantModule, RedisModule],
  providers: [MessageEventLogger, BotService],
  exports: [MessageEventLogger],
})
export class BotModule {}
