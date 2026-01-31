import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>("API_PORT", 3001);
  const corsOrigin = config.get<string>("CORS_ORIGIN", "http://localhost:3000");

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap();
