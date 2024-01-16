import { Injectable } from '@nestjs/common';
import { DatabaseService } from './DatabaseService';
import { Prisma } from '@prisma/client';

@Injectable()
export class DatabaseRepository {
  constructor(public readonly db: DatabaseService) {}

  public async executeQuery(query: string) {
    const result = await this.db.$queryRaw(Prisma.sql`${query}`);
    return result;
  }
}
