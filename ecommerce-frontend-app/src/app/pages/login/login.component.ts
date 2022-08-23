import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: String;
  password!: string

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor() { }

  onSubmit(form: NgForm): void {

    if (form.controls['email'].invalid) {
      this.emailInput.nativeElement.focus();
      return;
    }

    if (form.controls['password'].invalid) {
      this.passwordInput.nativeElement.focus();
      return;
    }

  }

  showError(controlName: string, form: NgForm): boolean {
    if (!form.controls[controlName]) {
      return false;
    }

    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

}
