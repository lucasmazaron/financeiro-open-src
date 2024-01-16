import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppSettings } from "./app.settings";
import { Settings } from "./app.settings.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public translate: TranslateService
  ) {
    this.settings = this.appSettings.settings;
  }
}
