import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { SetLoggerDto } from './dto';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { SetLoggerAutoCompleteInterceptor } from './auto-complate';
import { ConstantService } from '../../../constant/constant.service';
import { RedisService } from '../../../redis/redis.service';
import { BotConfig } from '../../../database/service/bot.config';
import { PermissionFlagsBits } from 'discord-api-types/v10';

@Injectable()
export class SetLoggerCommand {
  constructor(
    private readonly redisService: RedisService,
    private readonly botConfigService: BotConfig,
    private readonly constantService: ConstantService,
  ) {}

  @UseInterceptors(SetLoggerAutoCompleteInterceptor)
  @SlashCommand({
    name: 'set-logger',
    description: 'Set the logger channel',
  })
  async setLoggerHandler(
    @Context() [interaction]: SlashCommandContext,
    @Options() { type, channel }: SetLoggerDto,
  ) {
    if (
      !interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
      });
    }
    const validTypes = this.constantService.logChannelChoice;

    if (!validTypes.includes(type)) {
      return interaction.reply({
        content: `Invalid type: ${type}. Valid options are: ${validTypes.join(', ')}`,
      });
    }
    const guildId = interaction.guildId;
    const feature = interaction.commandName;
    const featureType = this.constantService.mapToDiscordChannelType(type);
    const value = channel.id;
    await this.botConfigService.setConfig(guildId, feature, featureType, value);
    await this.redisService.hashSet(
      this.constantService.RedisConfigDB,
      featureType,
      guildId,
      value,
    );
    return interaction.reply({
      content: `type: ${type} and selected channel is <#${channel.id}>`,
    });
  }
}
