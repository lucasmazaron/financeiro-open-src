import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UsuariosComponent {
  id_usuario: string;

  constructor(private router: Router) {}

  abrirFormulario(id: string) {
    this.id_usuario = id;

    this.router.navigate(["/usuarios/form", this.id_usuario]);
  }
}
