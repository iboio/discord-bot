import { Module } from '@nestjs/common';
import { JetstreamController } from './jetstream.controller';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [JetstreamController],
})
export class JetstreamModule {}
