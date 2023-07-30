import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: think about Database structure related to workspace-related statistics

async function bootstrap() {
  const PORT = process.env.PORT || 3002;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
