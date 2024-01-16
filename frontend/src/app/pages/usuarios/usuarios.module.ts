import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UsuariosComponent } from "./usuarios.component";
import { ConsultaUsuarioComponent } from "./consulta/consulta-usuario.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgScrollbarModule } from "ngx-scrollbar";
import { UsuariosService } from "./usuarios.service";
import { FormUsuarioComponent } from "./form/form-usuario.component";

export const routes: Routes = [
  { path: "", component: UsuariosComponent, pathMatch: "full" },
  {
    path: "form/:id",
    component: FormUsuarioComponent,
    data: { breadcrumb: "formulário" },
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgScrollbarModule,
  ],
  declarations: [
    UsuariosComponent,
    ConsultaUsuarioComponent,
    FormUsuarioComponent,
  ],
  providers: [UsuariosService],
})
export class UsuariosModule {}
