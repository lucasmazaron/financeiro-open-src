import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/controle-mensal/controle-mensal.module").then(
            (m) => m.ControleMensalModule
          ),
        data: { breadcrumb: "Controle Mensal" },
      },
      {
        path: "usuarios",
        loadChildren: () =>
          import("./pages/usuarios/usuarios.module").then(
            (m) => m.UsuariosModule
          ),
        data: { breadcrumb: "Usuarios" },
      },
      {
        path: "blank",
        component: BlankComponent,
        data: { breadcrumb: "Blank page" },
      },
    ],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then((m) => m.RegisterModule),
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
