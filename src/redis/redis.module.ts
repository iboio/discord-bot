import { Module, Global } from '@nestjs/common';
import * as Redis from 'ioredis';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'REDIS_CLIENT_DBO',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT');
        const password = configService.get<string>('REDIS_PASSWORD');
        const username = configService.get<string>('REDIS_USERNAME');
        return new Redis.Redis({
          host,
          port,
          db: 0,
          username,
          password,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_CLIENT_DB1',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT');
        const password = configService.get<string>('REDIS_PASSWORD');
        const username = configService.get<string>('REDIS_USERNAME');
        return new Redis.Redis({
          host,
          port,
          db: 1,
          username,
          password,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_CLIENT_DB2',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT');
        const password = configService.get<string>('REDIS_PASSWORD');
        const username = configService.get<string>('REDIS_USERNAME');
        return new Redis.Redis({
          host,
          port,
          db: 2,
          username,
          password,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [
    'REDIS_CLIENT_DBO',
    'REDIS_CLIENT_DB1',
    'REDIS_CLIENT_DB2',
    RedisService,
  ],
})
export class RedisModule {}
