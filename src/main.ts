import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder() //1
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone Api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      // Enable Bearer Auth here
      {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header",
      },
      "JWT-auth") // We will use this Bearer Auth with the JWT-auth name on the
    .build();

  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup('api', app, document); //3
  await app.listen(process.env.PORT ?? 3000);
  process.on('SIGTERM', () => app.close());
  process.on('SIGINT', () => app.close());
}
bootstrap();
