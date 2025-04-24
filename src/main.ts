import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomStrategy } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { default as proxy } from 'node-global-proxy';
import * as process from 'process';
async function bootstrap() {
  const natsHost = process.env.NATS_HOST || 'localhost';
  const natsPort = process.env.NATS_PORT || '4223';
  const jetstreamName = process.env.JETSTREAM_NAME;
  const jetstreamSubjects = process.env.JETSTREAM_SUBJECT.split(',');
  const proxyUrl = process.env.PROXY_URL;
  const jetstreamOptions: CustomStrategy = {
    strategy: new NatsJetStreamServer({
      connectionOptions: {
        servers: `${natsHost}:${natsPort}`,
        name: `bot`,
      },
      consumerOptions: {
        durable: 'bot-consumer',
        deliverTo: 'bot',
        manualAck: true,
      },
      streamConfig: {
        name: jetstreamName,
        subjects: jetstreamSubjects,
      },
    }),
  };
  proxy.setConfig({
    http: proxyUrl,
    https: proxyUrl,
  });
  proxy.start();
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice(jetstreamOptions);
  await microservice.listen();
  await app.listen(3005);
}
bootstrap();
