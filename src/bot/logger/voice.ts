import { Injectable } from '@nestjs/common';
import { SwitchedVoiceEvent, VoiceEvent } from '../../dto/voice';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { RedisService } from '../../redis/redis.service';
import { ConstantService } from '../../constant/constant.service';

@Injectable()
export class VoiceEventLogger {
  constructor(
    private readonly redisService: RedisService,
    private readonly constantService: ConstantService,
    private readonly client: Client,
  ) {}

  async VoiceEvent(data: any) {
    const channelId = await this.redisService.hashGet(
      this.constantService.RedisConfigDB,
      this.constantService.mapToDiscordChannelType('Voice Event'),
      data.guildId,
    );
    if (!channelId) {
      return;
    }
    const channel = this.client.channels.cache.get(channelId) as TextChannel;
    const embed = await this.VoiceEventEmbed(data.type, data);
    await channel.send({ embeds: [embed] });
  }

  async VoiceEventEmbed(type: string, data: any) {
    switch (type) {
      case 'join':
        data = data as VoiceEvent;
        return new EmbedBuilder()
          .setDescription(
            `<@!${data.userId}> joined channel <#${data.channelId}> (${data.channelName})\n\n`,
          )
          .setColor(14782187)
          .setAuthor({
            name: data.username,
            iconURL: data.userAvatar,
          })
          .setFooter({
            text: `Haydar's gonna save usHaydar's gonna save us`,
            iconURL: `https://discord.com/assets/${await this.redisService.stringGet(this.constantService.RedisConfigDB, 'botProfileURL')}.png`,
          })
          .setTimestamp(new Date());

      case 'left':
        data = data as VoiceEvent;
        return new EmbedBuilder()
          .setDescription(
            `<@!${data.userId}> left channel <#${data.channelId}> (${data.channelName})\n\n`,
          )
          .setColor(2895537)
          .setAuthor({
            name: data.username,
            iconURL: data.userProfile,
          })
          .setFooter({
            text: `Haydar's gonna save us`,
            iconURL: `https://discord.com/assets/${await this.redisService.stringGet(this.constantService.RedisConfigDB, 'botProfileURL')}.png`,
          })
          .setTimestamp(new Date());

      case 'switch':
        data = data as SwitchedVoiceEvent;
        return new EmbedBuilder()
          .setDescription(
            `<@!${data.userId}> switched from <#${data.oldChannelId}> (${data.oldChannelName}) to <#${data.newChannelId}> (${data.newChannelName})\n\n`,
          )
          .setColor(9060556)
          .setAuthor({
            name: data.username,
            iconURL: data.userAvatar,
          })
          .setFooter({
            text: `Haydar's gonna save us`,
            iconURL: `https://discord.com/assets/${await this.redisService.stringGet(this.constantService.RedisConfigDB, 'botProfileURL')}.png`,
          })
          .setTimestamp(new Date());
    }
  }
}
