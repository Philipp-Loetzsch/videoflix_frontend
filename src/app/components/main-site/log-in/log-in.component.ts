import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  constructor(private router: Router) {}
  submitted: boolean = false
  showPw: boolean = false
  emailError:string = ""
  pwError:string = ""

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });


  onSubmit() {
    this.submitted = true
    if (this.loginForm.valid) {
      console.log('E-Mail:', this.loginForm.value.email);
      this.router.navigate(['/sign_up']);
    }
    else this.errorMsg()
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  togglePw(){
    this.showPw = !this.showPw
  }

errorMsg() {
    const emailErrors = this.email.errors;
    const pwErrors = this.password.errors;
    if (emailErrors) {
      if (emailErrors['required']) this.emailError = 'Please enter an Email';
      else if (emailErrors['email'] || emailErrors['pattern']) {
        this.emailError =
          'Please enter a valid Email. E.g. your-mail@example.com';
      }
    } else this.emailError = '';
    if (pwErrors) this.errorPwMsg(pwErrors);
    else {
      this.pwError = '';
    }
  
  }
errorPwMsg(pwErrors: ValidationErrors) {
    if (pwErrors['required']) this.pwError = 'please enter a password';
    else if (pwErrors['minlength']) {
      this.pwError = 'minimum lenght 6';
    }
  }

}
