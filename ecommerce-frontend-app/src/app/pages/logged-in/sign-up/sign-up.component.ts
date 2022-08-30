import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { UserRequest } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.signUpForm = new FormGroup({
    //   name: new FormControl(),
    //   email: new FormControl(),
    //   password: new FormControl(),
    // });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  validateAllFormFields() {
    Object.keys(this.signUpForm.controls).forEach(field => {
      const control = this.signUpForm.get(field);
      control!.markAsTouched();
    });
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.validateAllFormFields();
      console.log("Deu ruim!!!")
      return;
    }

    this.addUser();
  }

  addUser() {
    const user: UserRequest = this.signUpForm.value;
    console.log(user);
    this.userService.addUser(user)
      .subscribe(
        res => this.onSuccessAddUser(),
        error => this.onErrorAddUser(),
      );
  }

  onSuccessAddUser(): void {
    this.toastr.success('Success!', 'Account created!');
    this.router.navigate(['home']);
  }

  onErrorAddUser(): void {
    this.toastr.error('Error!', 'Oops! Something went wrong :(');
  }

  showError(controlName: string): boolean {
    if (!this.signUpForm.get(controlName)) {
      return false;
    }

    return this.signUpForm.controls[controlName].invalid && this.signUpForm.controls[controlName].touched;
  }

}
