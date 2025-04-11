import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorResponseNormalizerFilter } from './app/http/response-normalizer/error-response-normalizer.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter))
  await app.listen(3000);
}
bootstrap();
