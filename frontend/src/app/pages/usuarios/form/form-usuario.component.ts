import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsuariosService } from "../usuarios.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-form-usuario",
  templateUrl: "./form-usuario.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormUsuarioComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private readonly _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap.subscribe((params) => {
      const id_usuario = params.get("id");
      if (!!id_usuario) {
        this.usuariosService.getUsuario(id_usuario).subscribe((res) => {
          console.log("res", res);
        });
      }
    });
  }

  setForm(): void {
    const usuarioLogado = this.authService.getUserData();
    this.form = this._formBuilder.group({
      id: null,
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      ativo: [true, Validators.required],
      id_empresa: [usuarioLogado?.id_empresa, Validators.required],
    });
  }
}
