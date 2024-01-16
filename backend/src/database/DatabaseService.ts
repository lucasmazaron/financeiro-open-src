import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  public async executeQuery(query: string): Promise<any> {
    const result = await this.$queryRawUnsafe(query);
    return result;
  }
}
