import { Module } from '@nestjs/common';
import { DatabaseService } from './DatabaseService';
import { DatabaseRepository } from './DatabaseRepository';

@Module({
  providers: [DatabaseService, DatabaseRepository],
  exports: [DatabaseService, DatabaseRepository],
})
export class DatabaseModule {}
