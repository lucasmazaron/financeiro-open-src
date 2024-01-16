import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    const usuarioLogado = this._authService.getUserData();

    if (this._authService.getToken()) {
      let headers = req.headers;

      if (!req.headers.get("Authorization")) {
        headers = req.headers.set(
          "Authorization",
          "Bearer " + this._authService.getToken()
        );
      }

      if (!!usuarioLogado) {
        headers = headers.append("id_usuario", usuarioLogado.id);
        if (!!usuarioLogado.id_empresa) {
          headers = headers.append("id_empresa", usuarioLogado.id_empresa);
        }
      }

      newReq = req.clone({
        headers,
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!!usuarioLogado) {
            // Sign out
            this._authService.logout();
            alert("Sessão expirada, faça login novamente!");
          } else {
            alert(error.error.message);
          }
        }

        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
