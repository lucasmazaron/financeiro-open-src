import { Module } from '@nestjs/common';
import { ControleMensalService } from './controle-mensal.service';
import { ControleMensalController } from './controle-mensal.controller';
import { DatabaseModule } from '@database/DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [ControleMensalController],
  providers: [ControleMensalService],
})
export class ControleMensalModule {}
