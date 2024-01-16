import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import {
  UntypedFormGroup,
  UntypedFormControl,
  AbstractControl,
  UntypedFormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public form: UntypedFormGroup;
  public email: UntypedFormControl;
  public senha: UntypedFormControl;

  constructor(
    public router: Router,
    public fb: UntypedFormBuilder,
    private authService: AuthService
  ) {
    //   this.form = fb.group({
    //       'email': ['', Validators.compose([Validators.required, emailValidator])],
    //       'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    //   });

    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      senha: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });

    this.email = this.form.controls["email"] as UntypedFormControl;
    this.senha = this.form.controls["senha"] as UntypedFormControl;
  }

  public onSubmit(values: any): void {
    if (this.form.valid) {
      this.authService.login(values).subscribe((response) => {
        this.authService.setToken(response.access_token);
        this.authService.setUserData(JSON.stringify(response.user));

        this.router.navigate(["/"]);
      });
    }
  }

  ngAfterViewInit() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide");
    }

    if (!environment.production) {
      this.email.setValue("dev@dev.com");
      this.senha.setValue("Senh@D1f1c1l!");
    }
  }
}

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}
