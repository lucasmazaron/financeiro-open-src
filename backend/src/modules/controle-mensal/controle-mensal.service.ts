import { DatabaseService } from '@database/DatabaseService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ControleMensalService {
  constructor(private db: DatabaseService) {}

  async getDespesas({ mes, ano, id_empresa, id_usuario }) {
    const despesas = await this.db.executeQuery(`
     select d.*
       from despesas d
       join usuario u on d.id_empresa = u.id_empresa
      where extract(month from d.data) = ${mes}
        and extract(year from d.data) = ${ano}
        and d.id_empresa = '${id_empresa}'
        and u.id = '${id_usuario}'
    `);

    return despesas;
  }
}
