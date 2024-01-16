import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { UsuariosService } from "../usuarios.service";

interface IUsuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  criado_em: Date;
  atualizado_em: Date;
  ultimo_login: null;
  ativo: boolean;
  hash: null;
  id_empresa: string;
}

@Component({
  selector: "app-consulta-usuario",
  templateUrl: "./consulta-usuario.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class ConsultaUsuarioComponent implements OnInit {
  usuarios: IUsuario[] = [];

  @Output() usuarioIdEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe((res) => {
      this.usuarios = res.data;
    });
  }

  abrirUsuario(id: string) {
    this.usuarioIdEmitter.emit(id);
  }
}
