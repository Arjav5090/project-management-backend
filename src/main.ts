import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

// ✅ Catch any potential errors
bootstrap().catch((err) => {
  console.error('❌ Error starting NestJS:', err);
});
