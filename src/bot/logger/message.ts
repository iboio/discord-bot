import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { ConstantService } from '../../constant/constant.service';
import { DeletedMessage, EditedMessage } from '../../dto/message';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';

@Injectable()
export class MessageEventLogger {
  constructor(
    private readonly redisService: RedisService,
    private readonly constantService: ConstantService,
    private readonly client: Client,
  ) {}

  async DeletedMessage(data: DeletedMessage) {
    const channelId = await this.redisService.hashGet(
      this.constantService.RedisConfigDB,
      this.constantService.mapToDiscordChannelType('Deleted Message'),
      data.guildId,
    );
    if (!channelId) {
      return;
    }
    const channel = this.client.channels.cache.get(channelId) as TextChannel;
    const embed = await this.DeletedMessageEmbed(data);
    await channel.send({ embeds: [embed] });
  }

  async EditedMessage(data: EditedMessage) {
    const channelId = await this.redisService.hashGet(
      this.constantService.RedisConfigDB,
      this.constantService.mapToDiscordChannelType('Edited Message'),
      data.guildId,
    );
    if (!channelId) {
      return;
    }
    const channel = this.client.channels.cache.get(channelId) as TextChannel;
    const embed = await this.EditedMessageEmbed(data);
    await channel.send({ embeds: [embed] });
  }

  private async DeletedMessageEmbed(data: DeletedMessage) {
    return new EmbedBuilder()
      .setTitle('Deleted Message')
      .setDescription(
        `**Time**\n<t:${Math.floor(data.eventTime / 1000)}>\n\n**Message**\n${data.content}8\n\n**Information**\n➛ **Channel:** <#${data.channelId}>\n➛ **User:** <@!${data.userId}>\n➛ **User ID:** ${data.userId}`,
      )
      .setColor(13649992)
      .setAuthor({
        name: data.username,
        iconURL: data.userAvatar,
      })
      .setTimestamp(new Date())
      .setFooter({
        text: "Haydar's gonna save us",
        iconURL: `https://discord.com/assets/${await this.redisService.stringGet(this.constantService.RedisConfigDB, 'botProfileURL')}.png`,
      });
  }

  private async EditedMessageEmbed(data: EditedMessage) {
    return new EmbedBuilder()
      .setTitle('Edited Message')
      .setDescription(
        `**Time**\n<t:${Math.floor(data.eventTime / 1000)}>\n\n` +
          `**Old Message**\n${data.oldContent}\n\n` +
          `**New Message**\n${data.newContent}\n\n` +
          `**Information**\n` +
          `➛ Channel: <#${data.channelId}>\n` +
          `➛ User: <@!${data.userId}>\n` +
          `➛ User ID: ${data.userId}`,
      )
      .setColor(13795654)
      .setAuthor({
        name: data.username,
        iconURL: data.userAvatar,
      })
      .setFooter({
        text: "Haydar's gonna save us",
        iconURL: `https://discord.com/assets/${await this.redisService.stringGet(this.constantService.RedisConfigDB, 'botProfileURL')}.png`,
      })
      .setTimestamp(new Date());
  }
}
