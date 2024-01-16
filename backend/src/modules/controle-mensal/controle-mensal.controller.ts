import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
} from '@nestjs/common';
import { ControleMensalService } from './controle-mensal.service';

@Controller('controle-mensal')
export class ControleMensalController {
  constructor(private readonly controleMensalService: ControleMensalService) {}

  @Get('despesas/mes/:mes/ano/:ano')
  async getDespesas(
    @Headers() headers: any,
    @Param('mes') mes: string,
    @Param('ano') ano: string,
  ) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.getDespesas({
      mes,
      ano,
      id_empresa,
      id_usuario,
    });
  }
}
