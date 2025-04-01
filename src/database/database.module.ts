import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../entities/config';
import { BotConfig } from './service/bot.config';

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [BotConfig],
  exports: [BotConfig],
})
export class DatabaseModule {}
