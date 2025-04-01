import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { NatsJetStreamContext } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { MessageEventLogger } from '../bot/logger/message';
import { DeletedMessage } from '../dto/message';

@Controller()
export class JetstreamController {
  constructor(private readonly messageLogger: MessageEventLogger) {}
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
}
