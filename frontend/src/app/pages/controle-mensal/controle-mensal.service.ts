import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api.service";

@Injectable()
export class ControleMensalService {
  constructor(private api: ApiService) {}

  getDespesas() {
    return this.api.get("/controle-mensal/despesas/mes/1/ano/2024");
  }
}
