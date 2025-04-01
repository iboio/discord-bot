import { Module } from '@nestjs/common';
import { SetLoggerCommand } from './commands/set-logger/command';
import { ConstantModule } from '../constant/constant.module';
import { DatabaseModule } from '../database/database.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [ConstantModule, DatabaseModule, RedisModule],
  providers: [SetLoggerCommand],
  exports: [],
})
export class CommandModule {}
