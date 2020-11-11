import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  onSubmitLogin() {
    this.authService
      .login(this.form.get("login").value, this.form.get("password").value)
      .subscribe((x) => {
        if (x) this.router.navigate(["/main"]);
      });
  }
}
