import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ControleMensalComponent } from "./controle-mensal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ControleMensalService } from "./controle-mensal.service";
import { ApiService } from "src/app/api.service";

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
  ],
  declarations: [ControleMensalComponent],
  providers: [ControleMensalService, ApiService],
})
export class ControleMensalModule {}
