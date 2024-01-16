import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ControleMensalService } from "./controle-mensal.service";

interface IDespesas {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  pago: boolean;
  data_pago: Date | null;
}

enum OrigemReceita {
  UNIMED = "Unimed",
  CLINICA_OTORRINO = "Clinica Otorrino",
  SOBREVIVER = "Sobreviver",
  CLINIMED = "Sobreviver",
}

interface IReceitas {
  id: string;
  origem: OrigemReceita;
  descricao: string;
  valor: number;
  data: Date;
  recebido: boolean;
  data_recebido: Date | null;
}

@Component({
  selector: "app-controle-mensal",
  templateUrl: "./controle-mensal.component.html",
  styleUrls: ["./controle-mensal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ControleMensalComponent implements OnInit {
  id_usuario: string;

  receitas: IReceitas[];
  despesas: IDespesas[];

  constructor(
    private router: Router,
    private controleMensalService: ControleMensalService
  ) {}

  ngOnInit(): void {
    this.controleMensalService.getDespesas().subscribe((data) => {
      this.despesas = data;
    });
  }
}
