export class VoiceStateUpdate {
  type: string;
  guildId: string;
  channelId: string;
  channelName: string;
  userId: string;
  username: string;
  eventTime: number;
}

export class VoiceStateSwitch {
  type: string;
  guildId: string;
  oldChannelId: string;
  oldChannelName: string;
  newChannelId: string;
  newChannelName: string;
  userId: string;
  username: string;
  eventTime: number;
}

export class VoiceStatus {
  type: string;
  guildId: string;
  channelId: string;
  channelName: string;
  userId: string;
  username: string;
  selfMute: boolean;
  selfDeaf: boolean;
  eventTime: number;
}
