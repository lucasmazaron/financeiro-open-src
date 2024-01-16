import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) return true;

  alert("Acesso negado, faça login para acessar o sistema!");
  const router = inject(Router);
  router.navigate(["/login"]);
  return false;
};
