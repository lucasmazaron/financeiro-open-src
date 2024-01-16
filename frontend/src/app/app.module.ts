import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing";
import { NgScrollbarModule } from "ngx-scrollbar";

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

import { AppSettings } from "./app.settings";
import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";
import { HeaderComponent } from "./theme/components/header/header.component";
import { FooterComponent } from "./theme/components/footer/footer.component";
import { SidebarComponent } from "./theme/components/sidebar/sidebar.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { BreadcrumbComponent } from "./theme/components/breadcrumb/breadcrumb.component";
import { BackTopComponent } from "./theme/components/back-top/back-top.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { SearchComponent } from "./pages/search/search.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { FlagsMenuComponent } from "./theme/components/flags-menu/flags-menu.component";
import { AuthService } from "./auth/auth.service";
import { ApiService } from "./api.service";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    NgScrollbarModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    UserMenuComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    FlagsMenuComponent,
  ],
  providers: [
    AppSettings,
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
