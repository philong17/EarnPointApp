import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS
  app.enableCors();

  // Cấu hình global prefix
  app.setGlobalPrefix('api/v1');

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Earn Point API')
    .setDescription('API documentation for Earn Point application')
    .setVersion('1.0')
    .addTag('customers', 'Quản lý khách hàng')
    .addTag('points', 'Quản lý điểm thưởng')
    .addTag('point-rules', 'Quản lý quy tắc tích điểm')
    .addTag('analytics', 'Thống kê và phân tích')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
