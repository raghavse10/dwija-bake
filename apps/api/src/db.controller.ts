import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class DbController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("db")
  async checkDb() {
    try {
      const result = await this.prisma.$queryRaw<[{ now: Date }]>`SELECT now()`;
      const time = result[0]?.now;
      return {
        ok: true,
        time: time instanceof Date ? time.toISOString() : String(time),
      };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }
}
