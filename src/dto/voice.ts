export class VoiceEvent {
  type: string;
  guildId: string;
  channelId: string;
  channelName: string;
  userId: string;
  userAvatar: string;
  username: string;
  eventTime: number;
}

export class SwitchedVoiceEvent {
  type: string;
  guildId: string;
  oldChannelId: string;
  oldChannelName: string;
  newChannelId: string;
  newChannelName: string;
  userId: string;
  username: string;
  userAvatar: string;
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
