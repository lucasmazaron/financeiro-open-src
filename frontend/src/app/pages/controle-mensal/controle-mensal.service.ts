import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api.service";

@Injectable()
export class ControleMensalService {
  constructor(private api: ApiService) {}

  getDespesas(mes: string, ano: string) {
    return this.api.get(`/controle-mensal/despesas/mes/${mes}/ano/${ano}`);
  }

  getReceitas(mes: string, ano: string) {
    return this.api.get(`/controle-mensal/receitas/mes/${mes}/ano/${ano}`);
  }

  createReceita(data: any) {
    return this.api.post(`/controle-mensal/receitas`, data);
  }

  deleteReceita(id: string) {
    return this.api.delete(`/controle-mensal/receitas/${id}`);
  }

  updateReceita(data: any) {
    return this.api.put(`/controle-mensal/receitas`, data);
  }

  createDespesa(data: any) {
    return this.api.post(`/controle-mensal/despesas`, data);
  }

  updateDespesa(data: any) {
    return this.api.put(`/controle-mensal/despesas`, data);
  }

  deleteDespesa(id: string) {
    return this.api.delete(`/controle-mensal/despesas/${id}`);
  }

  copiarDespesas(data: any) {
    return this.api.post(`/controle-mensal/despesas/copiar`, data);
  }
}
