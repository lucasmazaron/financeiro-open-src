import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ControleMensalComponent } from "./controle-mensal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ControleMensalService } from "./controle-mensal.service";
import { ApiService } from "src/app/api.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FormReceitasComponent } from "./formularios/receitas/form-receitas.component";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FormDespesasComponent } from "./formularios/despesas/form-despesas.component";

export const routes: Routes = [
  { path: "", component: ControleMensalComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgScrollbarModule,
    NgxChartsModule,
    CurrencyMaskModule,
  ],
  declarations: [
    ControleMensalComponent,
    FormReceitasComponent,
    FormDespesasComponent,
  ],
  providers: [ControleMensalService, ApiService],
})
export class ControleMensalModule {}
