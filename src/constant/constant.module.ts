import { Global, Module } from '@nestjs/common';
import { ConstantService } from './constant.service';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [ConstantService],
  exports: [ConstantService],
})
export class ConstantModule {}
