import { DatabaseService } from '@database/DatabaseService';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import * as _ from 'lodash';
@Injectable()
export class UsuariosService {
  constructor(private db: DatabaseService) {}

  async create(createUsuarioDto: any) {
    return await this.db.usuario.create({
      data: createUsuarioDto,
    });
  }

  async listaPaginado(page: number) {
    const take = 10;
    const result = await this.db.usuario.findMany({
      skip: page * 10 - 10,
      take,
    });

    const total = await this.db.usuario.count();

    return {
      data: result as Usuario[],
      pagination: {
        total,
        lastPage: _.ceil(total / take),
        perPage: take,
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    return await this.db.usuario.findFirst({
      where: {
        id,
      },
    });
  }

  async update(updateUsuarioDTO: any) {
    return await this.db.usuario.update({
      data: updateUsuarioDTO,
      where: {
        id: updateUsuarioDTO.id,
      },
    });
  }

  async remove(id: string) {
    return await this.db.usuario.delete({
      where: {
        id,
      },
    });
  }
}
