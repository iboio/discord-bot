export class UpdatedMessage {
  guildId: string;
  channelId: string;
  channelName: string;
  userId: string;
  oldContent: string;
  newContent: string;
  userAvatar: string;
  eventTime: number;
}
export class DeletedMessage {
  guildId: string;
  channelId: string;
  channelName: string;
  userId: string;
  username: string;
  userAvatar: string;
  botId: string;
  content: string;
  eventTime: number;
}
