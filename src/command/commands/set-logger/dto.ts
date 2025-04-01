import { ChannelOption, StringOption } from 'necord';
import { GuildChannel } from 'discord.js';

export class SetLoggerDto {
  @StringOption({
    name: 'type',
    description: 'set what type of logger you want to set',
    required: true,
    autocomplete: true,
  })
  type: string;
  @ChannelOption({
    name: 'channel',
    description: 'Channel',
    required: true,
  })
  channel: GuildChannel;
}
