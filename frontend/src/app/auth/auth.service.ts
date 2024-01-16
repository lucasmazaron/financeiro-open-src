import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/api.service";
import { LocalStorageKeys } from "src/app/constants/localStorage";

type UsuarioLogado = {
  id: string;
  nome: string;
  email: string;
  id_empresa: string;
  nome_empresa: string;
};

@Injectable()
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}

  public login({ email, senha }: any): Observable<any> {
    return this.api.post("/auth/login", { email, senha });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(LocalStorageKeys.JWT_TOKEN);

    return !!token && token !== "" && token !== "undefined";
  }

  public getToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.JWT_TOKEN);
  }

  public setToken(token: string): void {
    localStorage.setItem(LocalStorageKeys.JWT_TOKEN, token);
  }

  public removeToken(): void {
    localStorage.removeItem(LocalStorageKeys.JWT_TOKEN);
  }

  public setUserData(userData: string): void {
    localStorage.setItem(LocalStorageKeys.DADOS_USUARIO, userData);
  }

  public getUserData(): UsuarioLogado | null {
    const userStr = localStorage.getItem(LocalStorageKeys.DADOS_USUARIO);

    if (!!userStr) {
      return JSON.parse(userStr) as UsuarioLogado;
    }

    return null;
  }

  public removeUserData(): void {
    localStorage.removeItem(LocalStorageKeys.DADOS_USUARIO);
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public logout(): void {
    this.clearLocalStorage();
    this.router.navigate(["/login"]);
  }

  public getAuthorizationHeader(): string {
    return `Bearer ${this.getToken()}`;
  }
}
