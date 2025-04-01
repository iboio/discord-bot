import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @EventPattern('event.msg.update')
  // async handleMessageUpdate(
  //   @Payload() data: string,
  //   @Ctx() context: NatsJetStreamContext,
  // ) {}
  //
  // @EventPattern('event.voice.log')
  // async handleVoiceLog(
  //   @Payload() data: string,
  //   @Ctx() context: NatsJetStreamContext,
  // ) {}
}
