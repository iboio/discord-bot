import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandModule } from './command/command.module';
import * as process from 'process';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { JetstreamModule } from './jetstream/jetstream.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
      ],
      development: ['1043928530012086283'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Config],
      synchronize: true,
    }),
    CommandModule,
    BotModule,
    DatabaseModule,
    RedisModule,
    JetstreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
