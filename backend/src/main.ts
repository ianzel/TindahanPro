import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "*",
  });

  await app.listen(3000);

  console.log("🚀 Backend running at http://127.0.0.1:3000");
}

bootstrap();