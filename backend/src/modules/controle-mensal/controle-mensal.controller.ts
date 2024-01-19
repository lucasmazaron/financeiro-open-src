import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
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

  @Get('receitas/mes/:mes/ano/:ano')
  async getReceitas(
    @Headers() headers: any,
    @Param('mes') mes: string,
    @Param('ano') ano: string,
  ) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.getReceitas({
      mes,
      ano,
      id_empresa,
      id_usuario,
    });
  }

  @Post('despesas')
  async createDespesa(@Headers() headers: any, @Body() body: any) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }
    return await this.controleMensalService.createDespesas({
      id_empresa,
      dados: body,
    });
  }

  @Post('receitas')
  async createReceita(@Headers() headers: any, @Body() body: any) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }
    return await this.controleMensalService.createReceita({
      id_empresa,
      dados: body,
    });
  }

  @Post('despesas/copiar')
  async copiarDespesas(@Headers() headers: any, @Body() body: any) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }
    return await this.controleMensalService.copiarDespesas({
      id_empresa,
      dados: body,
    });
  }

  @Put('receitas')
  async updateReceita(@Headers() headers: any, @Body() body: any) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.updateReceita({
      id_empresa,
      dados: body,
    });
  }

  @Put('despesas')
  async updateDespesa(@Headers() headers: any, @Body() body: any) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.updateDespesas({
      id_empresa,
      dados: body,
    });
  }

  @Delete('receitas/:id')
  async deleteReceita(@Headers() headers: any, @Param('id') id: string) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.deleteReceita({
      id_empresa,
      id,
    });
  }

  @Delete('despesas/:id')
  async deleteDespesa(@Headers() headers: any, @Param('id') id: string) {
    const { id_usuario, id_empresa } = headers;

    if (!id_empresa || !id_usuario) {
      throw new BadRequestException('id_empresa e id_usuario são obrigatórios');
    }

    return await this.controleMensalService.deleteDespesa({
      id_empresa,
      id,
    });
  }
}
