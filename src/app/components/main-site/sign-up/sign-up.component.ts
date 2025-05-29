import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private router: Router) {}

  showPw: boolean = false;
  showCpw: boolean = false;
  submitted: boolean = false;
  emailError: string = '';
  pwError: string = '';
  cpwError: string = '';

  signinForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordsMatch }
  );

  get email(): FormControl {
    return this.signinForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.signinForm.get('password') as FormControl;
  }
  get confirmpassword(): FormControl {
    return this.signinForm.get('confirmpassword') as FormControl;
  }

  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmpassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      console.log('E-Mail:', this.signinForm.value.email);
      this.router.navigate(['/sign_up']);
    } else this.errorMsg();
  }

  errorMsg() {
    const emailErrors = this.email.errors;
    const pwErrors = this.password.errors;
    const pwValue = this.password.value;
    const cpwValue = this.confirmpassword.value;
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
      this.cpwError = '';
    }
    if (pwValue !== cpwValue && !pwErrors) this.cpwError = 'passwords dont match';
  }

  errorPwMsg(pwErrors: ValidationErrors) {
    const confirmPwErrors = this.confirmpassword.errors;
    if (pwErrors['required']) this.pwError = 'please enter a password';
    else if (pwErrors['minlength']) {
      this.pwError = 'minimum lenght 6';
    }
    if (confirmPwErrors)
      if (confirmPwErrors['required'])
        this.cpwError = 'please confirm your password';
      else if (confirmPwErrors['minLenght']) this.cpwError = 'minimum lenght 6';
  }

  togglePw(field: 'showPw' | 'showCpw') {
    this[field] = !this[field];
  }
}
