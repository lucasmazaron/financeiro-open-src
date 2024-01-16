import { Injectable } from "@angular/core";
import { ApiService } from "src/app/api.service";

@Injectable()
export class UsuariosService {
  constructor(private api: ApiService) {}

  getUsuarios() {
    return this.api.get("/usuarios/pages/1");
  }

  getUsuario(id: string) {
    return this.api.get(`/usuarios/${id}`);
  }
}
