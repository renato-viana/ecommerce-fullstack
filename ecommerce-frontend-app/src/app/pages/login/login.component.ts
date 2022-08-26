import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { TokenResponse } from 'src/app/shared/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  password!: string
  token!: string;
  isLoading!: boolean;
  errorLogin: boolean = false;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.errorLogin = false;

    if (!form.valid) {
      form.controls['email'].markAsTouched;
      form.controls['password'].markAsTouched;

      if (form.controls['email'].invalid) {
        this.emailInput.nativeElement.focus();
        return;
      }

      if (form.controls['password'].invalid) {
        this.passwordInput.nativeElement.focus();
        return;
      }

      return;
    }

    const user: User = {
      email: this.email,
      password: this.password
    }

    this.login(user);
  }

  login(user: User) {
    this.isLoading = true;
    this.loginService.login(user)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        res => this.onSuccess(res),
        error => this.onError(error)
      )
  }

  onSuccess(res: TokenResponse): void {
    this.token = res.token;
    this.router.navigate(["home"]);
  }

  onError(error: {}): void {
    this.errorLogin = true;
    console.log("Message: " + error);
  }

  showError(controlName: string, form: NgForm): boolean {
    if (!form.controls[controlName]) {
      return false;
    }

    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

}
