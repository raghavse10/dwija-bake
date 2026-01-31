import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthController } from "./health.controller";
import { DbController } from "./db.controller";
import { ConfigValidationSchema } from "./config/schema";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"],
      validate: (config) => ConfigValidationSchema.parse(config),
    }),
    PrismaModule,
  ],
  controllers: [HealthController, DbController],
})
export class AppModule {}
