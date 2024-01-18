import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ControleMensalService } from "./controle-mensal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { DateUtils } from "utils/date.utils";
import momentTimezone from "moment-timezone";

interface IDespesa {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  pago: boolean;
  data_pago: Date | null;
}

export const OrigemReceita = [
  { key: "UNIMED", value: "Unimed" },
  { key: "CLINICA_OTORRINO", value: "Clinica Otorrino" },
  { key: "SOBREVIVER", value: "Sobreviver" },
  { key: "CLINIMED", value: "Clinimed" },
  { key: "OUTROS", value: "Outros" },
];

interface IReceita {
  id: string;
  origem: any;
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
  formDespesas: FormGroup;
  formReceitas: FormGroup;
  formFiltros: FormGroup;

  id_usuario: string;

  receitas: IReceita[];
  despesas: IDespesa[];

  totalEmDespesas: number = 0;
  totalEmReceitas: number = 0;
  saldo: number = 0;

  dateUtils = DateUtils;

  editandoDespesa: boolean = false;
  editandoReceita: boolean = false;

  constructor(
    private controleMensalService: ControleMensalService,
    private readonly _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.buscar();
  }

  cancelarFormReceitas(): void {
    this.editandoReceita = false;
    this.formReceitas.reset();
  }

  editarReceita(receita?: IReceita): void {
    this.formReceitas
      .get("data")
      ?.setValue(DateUtils.formatDateToBackend(new Date()));

    this.formDespesas.get("recebido")?.setValue(false);

    this.editandoReceita = true;
    this.cancelarFormDespesa();

    if (!!receita) {
      this.formReceitas.patchValue({
        ...receita,
        data: DateUtils.formatDateToBackend(receita.data),
        data_recebido: DateUtils.formatDateToBackend(receita.data_recebido),
      });
    }
  }

  copiarDespesas(): void {
    const mes = this.formFiltros.get("mes")?.value - 1;
    const ano = this.formFiltros.get("ano")?.value;

    if (!confirm(`Deseja realmente copiar as despesas do mês anterior?`)) {
      return;
    }

    this.controleMensalService
      .copiarDespesas({
        mes,
        ano,
      })
      .subscribe(() => this.buscar());
  }

  editarDespesa(despesa?: IDespesa): void {
    this.formDespesas
      .get("data")
      ?.setValue(DateUtils.formatDateToBackend(new Date()));

    this.formDespesas.get("pago")?.setValue(false);

    this.editandoDespesa = true;
    this.cancelarFormReceitas();

    if (!!despesa) {
      this.formDespesas.patchValue({
        ...despesa,
        data: DateUtils.formatDateToBackend(despesa.data),
        data_pago: DateUtils.formatDateToBackend(despesa.data_pago),
      });
    }
  }

  deleteDespesa(id: string): void {
    if (!confirm("Deseja realmente excluir esta despesa?")) {
      return;
    }

    this.controleMensalService.deleteDespesa(id).subscribe(() => this.buscar());
  }

  deleteReceita(id: string): void {
    if (!confirm("Deseja realmente excluir esta receita?")) {
      return;
    }

    this.controleMensalService.deleteReceita(id).subscribe(() => this.buscar());
  }

  salvarReceita(): void {
    const receita = this.formReceitas.value;

    receita.recebido = receita.recebido === "true";
    if (!!receita.id) {
      this.controleMensalService
        .updateReceita(receita)
        .subscribe(() => this.buscar());
    } else {
      this.controleMensalService
        .createReceita(receita)
        .subscribe(() => this.buscar());
    }

    this.editandoReceita = false;
    this.formReceitas.reset();
  }

  salvarDespesa(): void {
    const despesa = this.formDespesas.value;

    despesa.pago = despesa.pago === "true";
    if (!!despesa.id) {
      this.controleMensalService
        .updateDespesa(despesa)
        .subscribe(() => this.buscar());
    } else {
      this.controleMensalService
        .createDespesa(despesa)
        .subscribe(() => this.buscar());
    }

    this.editandoDespesa = false;
    this.formDespesas.reset();
  }

  cancelarFormDespesa(): void {
    this.editandoDespesa = false;
    this.formDespesas.reset();
  }

  despesasRowClick(despesa: IDespesa): void {
    this.formDespesas.patchValue(despesa);
  }

  buscar() {
    this.buscarDespesas();
    this.buscarReceitas();
  }

  buscarReceitas(): void {
    const mes = this.formFiltros.get("mes")?.value;
    const ano = this.formFiltros.get("ano")?.value;

    this.controleMensalService.getReceitas(mes, ano).subscribe((data) => {
      this.receitas = data;

      this.totalEmReceitas = data.reduce(
        (acc: any, cur: any) => acc + cur.valor,
        0
      );

      this.calculaSaldo();
    });
  }

  buscarDespesas(): void {
    const mes = this.formFiltros.get("mes")?.value;
    const ano = this.formFiltros.get("ano")?.value;

    this.controleMensalService.getDespesas(mes, ano).subscribe((data) => {
      this.despesas = data;

      this.totalEmDespesas = data.reduce(
        (acc: any, cur: any) => acc + cur.valor,
        0
      );
      this.calculaSaldo();
    });
  }

  calculaSaldo(): void {
    this.saldo = this.totalEmReceitas - this.totalEmDespesas;
  }

  getDespRowClass(despesa: IDespesa): any {
    if (!!despesa?.pago) {
      return {
        pago: true,
      };
    }

    return {
      "vencendo-hoje": this.isDespesaAtrasada(despesa),
      "vencendo-semana": this.isDespesaAVencerNaSemana(despesa),
    };
  }

  getRecRowClass(receita: IReceita): any {
    if (!!receita?.recebido) {
      return {
        recebido: true,
      };
    }

    return {
      "vencendo-hoje": this.isReceitaAtrasada(receita),
      "vencendo-semana": this.isReceitaAVencerNaSemana(receita),
    };
  }

  isReceitaAVencerNaSemana(receita: IReceita): boolean {
    // Cria a data atual na zona horária "America/Sao_Paulo"
    const dataAtual = momentTimezone.tz(new Date(), "America/Sao_Paulo");

    // Converte a data da despesa para a mesma zona horária
    const dataReceita = momentTimezone.tz(receita.data, "America/Sao_Paulo");

    // Verifica se a data da despesa está entre hoje e os próximos 7 dias
    return (
      dataReceita.isAfter(dataAtual) &&
      dataReceita.isBefore(dataAtual.clone().add(7, "days"))
    );
  }

  isReceitaAtrasada(receita: IReceita): boolean {
    const dataAtual = momentTimezone
      .tz(new Date(), "America/Sao_Paulo")
      .toDate();
    const dataReceita = momentTimezone
      .tz(receita.data, "America/Sao_Paulo")
      .toDate();

    if (dataReceita <= dataAtual) {
      return true;
    }

    return false;
  }

  isDespesaAVencerNaSemana(despesa: IDespesa): boolean {
    // Cria a data atual na zona horária "America/Sao_Paulo"
    const dataAtual = momentTimezone.tz(new Date(), "America/Sao_Paulo");

    // Converte a data da despesa para a mesma zona horária
    const dataDespesa = momentTimezone.tz(despesa.data, "America/Sao_Paulo");

    // Verifica se a data da despesa está entre hoje e os próximos 7 dias
    return (
      dataDespesa.isAfter(dataAtual) &&
      dataDespesa.isBefore(dataAtual.clone().add(7, "days"))
    );
  }

  isDespesaAtrasada(despesa: IDespesa): boolean {
    const dataAtual = momentTimezone
      .tz(new Date(), "America/Sao_Paulo")
      .toDate();
    const dataDespesa = momentTimezone
      .tz(despesa.data, "America/Sao_Paulo")
      .toDate();

    if (dataDespesa <= dataAtual) {
      return true;
    }

    return false;
  }

  setForm(): void {
    const usuarioLogado = this.authService.getUserData();

    this.formFiltros = this._formBuilder.group({
      mes: [
        DateUtils.getMonth(
          momentTimezone.tz(new Date(), "America/Sao_Paulo").toDate()
        ),
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      ano: [
        DateUtils.getYear(
          momentTimezone.tz(new Date(), "America/Sao_Paulo").toDate()
        ),
        [Validators.required, Validators.min(2023)],
      ],
    });

    this.formFiltros.get("mes")?.valueChanges.subscribe((value) => {
      this.buscar();
    });
    this.formFiltros.get("ano")?.valueChanges.subscribe((value) => {
      this.buscar();
    });

    this.formDespesas = this._formBuilder.group({
      id: null,
      descricao: [null, Validators.required],
      valor: [null, Validators.required],
      data: [null, Validators.required],
      pago: [false, Validators.required],
      data_pago: [null, Validators.required],
      id_empresa: [usuarioLogado?.id_empresa, Validators.required],
    });

    this.formReceitas = this._formBuilder.group({
      id: null,
      descricao: [null, Validators.required],
      origem: [null, Validators.required],
      valor: [null, Validators.required],
      data: [null, Validators.required],
      recebido: [false, Validators.required],
      data_recebido: [null, Validators.required],
      id_empresa: [usuarioLogado?.id_empresa, Validators.required],
    });

    this.formDespesas.get("pago")?.valueChanges.subscribe((value) => {
      if (!!value && value === "true") {
        this.formDespesas
          .get("data_pago")
          ?.setValue(DateUtils.formatDateToBackend(new Date()));
      } else {
        this.formDespesas.get("data_pago")?.setValue(null);
      }
    });

    this.formReceitas.get("recebido")?.valueChanges.subscribe((value) => {
      if (!!value && value === "true") {
        this.formReceitas
          .get("data_recebido")
          ?.setValue(DateUtils.formatDateToBackend(new Date()));
      } else {
        this.formReceitas.get("data_recebido")?.setValue(null);
      }
    });
  }
}
