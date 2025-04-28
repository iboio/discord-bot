import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { NatsJetStreamContext } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { MessageEventLogger } from '../bot/logger/message';
import { DeletedMessage, EditedMessage } from '../dto/message';
import { VoiceEventLogger } from '../bot/logger/voice';

@Controller()
export class JetstreamController {
  constructor(
    private readonly messageLogger: MessageEventLogger,
    private readonly voiceLogger: VoiceEventLogger,
  ) {}
  @EventPattern('event.msg.delete')
  async handleMessageDelete(
    @Payload() data: DeletedMessage,
    @Ctx() context: NatsJetStreamContext,
  ) {
    try {
      await this.messageLogger.DeletedMessage(data);
      context.message.ack();
    } catch (error) {
      console.error(error);
    }
  }

  @EventPattern('event.msg.edit')
  async handleMessageEdit(
    @Payload() data: EditedMessage,
    @Ctx() context: NatsJetStreamContext,
  ) {
    try {
      await this.messageLogger.EditedMessage(data);
      context.message.ack();
    } catch (error) {
      console.error(error);
    }
  }

  @EventPattern('event.voice.log')
  async handleVoiceEvent(
    @Payload() data: any,
    @Ctx() context: NatsJetStreamContext,
  ) {
    try {
      await this.voiceLogger.VoiceEvent(data);
      context.message.ack();
    } catch (error) {
      console.error(error);
    }
  }
}
