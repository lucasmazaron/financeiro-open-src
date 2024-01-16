import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: any) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Get('pages/:page')
  async listaUsuariosPaginado(@Param('page') page: number) {
    return await this.usuariosService.listaPaginado(page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuariosService.findOne(id);
  }

  @Patch()
  update(@Body() updateUsuarioDto: any) {
    return this.usuariosService.update(updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuariosService.remove(id);
  }
}
