import * as momentTimezone from 'moment-timezone';
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
        order by d.pago, d.data, d.data_pago
    `);

    return despesas;
  }

  async createDespesas({ id_empresa, dados }) {
    dados = this.formataDataDespesa(dados);

    const despesa = await this.db.despesas.create({
      data: {
        ...dados,
        id_empresa,
      },
    });

    return despesa;
  }

  async updateDespesas({ id_empresa, dados }) {
    dados = this.formataDataDespesa(dados);
    const despesa = await this.db.despesas.update({
      where: {
        id: dados.id,
      },
      data: {
        ...dados,
        id_empresa,
      },
    });

    return despesa;
  }

  async deleteDespesa({ id_empresa, id }) {
    const despesa = await this.db.despesas.delete({
      where: {
        id,
        id_empresa,
      },
    });

    return despesa;
  }

  formataDataDespesa(dados: any) {
    dados.data = this.formataData(dados.data);

    if (dados?.data_pago) {
      dados.data_pago = this.formataData(dados.data_pago);
    } else {
      delete dados.data_pago;
    }

    return dados;
  }

  async getReceitas({ mes, ano, id_empresa, id_usuario }) {
    const receitas = await this.db.executeQuery(`
      select r.*
        from receitas r
        join usuario u on r.id_empresa = u.id_empresa
       where extract(month from r.data) = ${mes}
         and extract(year from r.data) = ${ano}
         and r.id_empresa = '${id_empresa}'
         and u.id = '${id_usuario}'
        order by r.recebido, r.data, r.data_recebido
    `);

    return receitas;
  }

  formataDataReceita(dados: any) {
    dados.data = this.formataData(dados.data);

    if (dados?.data_recebido) {
      dados.data_recebido = this.formataData(dados.data_recebido);
    } else {
      delete dados.data_recebido;
    }

    return dados;
  }

  async createReceita({ id_empresa, dados }) {
    dados = this.formataDataReceita(dados);

    delete dados.id;
    const receita = await this.db.receitas.create({
      data: {
        ...dados,
        id_empresa,
      },
    });

    return receita;
  }

  async updateReceita({ id_empresa, dados }) {
    dados = this.formataDataReceita(dados);

    const receita = await this.db.receitas.update({
      where: {
        id: dados.id,
      },
      data: {
        ...dados,
        id_empresa,
      },
    });

    return receita;
  }

  async deleteReceita({ id_empresa, id }) {
    const receita = await this.db.receitas.delete({
      where: {
        id,
        id_empresa,
      },
    });

    return receita;
  }

  formataData(dados: string) {
    return momentTimezone(dados).tz('America/Sao_Paulo').toISOString();
  }

  formataDataParaDate(dados: string) {
    return momentTimezone(dados).tz('America/Sao_Paulo').toDate();
  }

  async copiarDespesas({ id_empresa, dados }) {
    const despesas = await this.db.executeQuery(`
     select d.*
       from despesas d
      where extract(month from d.data) = ${dados.mes}
        and extract(year from d.data) = ${dados.ano}
        and d.id_empresa = '${id_empresa}'
        order by d.data, d.data_pago
    `);

    const despesasTratadas = despesas.map((despesa) => {
      delete despesa.id;
      delete despesa.data_pago;
      despesa.pago = false;

      despesa.data = this.formataDataParaDate(despesa.data);
      despesa.data.setMonth(despesa.data.getMonth() + 1);

      if (despesa.data.getMonth() + 1 < despesa.data.getMonth()) {
        despesa.data.setDate(momentTimezone(despesa.data).date() - 3);
      }

      return despesa;
    });

    await this.db.despesas.createMany({
      data: despesasTratadas,
    });
  }

  async copiarReceitas({ id_empresa, dados }) {
    const receitas = await this.db.executeQuery(`
      select r.*
        from receitas r
       where extract(month from r.data) = ${dados.mes}
         and extract(year from r.data) = ${dados.ano}
         and r.id_empresa = '${id_empresa}'
        order by r.data, r.data_recebido
    `);

    const receitasTratadas = receitas.map((receita) => {
      delete receita.id;
      delete receita.data_recebido;
      receita.recebido = false;

      const dataVencimento = this.formataDataParaDate(receita.data);
      receita.data.setMonth(dataVencimento.getMonth() + 1);

      if (dataVencimento.getMonth() + 1 < receita.data.getMonth()) {
        receita.data.setDate(momentTimezone(receita.data).date() - 3);
      }

      return receita;
    });

    await this.db.receitas.createMany({
      data: receitasTratadas,
    });
  }

  async copiar({ id_empresa, dados }) {
    await Promise.all([
      this.copiarDespesas({ id_empresa, dados }),
      this.copiarReceitas({ id_empresa, dados }),
    ]);
  }
}
