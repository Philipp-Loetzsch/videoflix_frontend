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
import { ErrorsService } from '../../../services/errors.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(
    private router: Router,
    private errorService: ErrorsService,
    private authService: AuthService
  ) {
    this.currentEmail = this.authService.currentEmail;
  }
  showPw: boolean = false;
  showCpw: boolean = false;
  submitted: boolean = false;
  emailError: string = '';
  pwError: string = '';
  cpwError: string = '';
  currentEmail: string = '';
  signInErrorMsg: string = '';

  resetForm = new FormGroup(
    {
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


  get password(): FormControl {
    return this.resetForm.get('password') as FormControl;
  }
  get confirmpassword(): FormControl {
    return this.resetForm.get('confirmpassword') as FormControl;
  }

  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmpassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    this.submitted = true;
    if (this.resetForm.valid && this.resetForm.value) {
      const registrated = await this.authService.createUser(this.resetForm);
      if (registrated) this.router.navigate(['/log_in']);
      else this.signInErrorMsg = 'Sign up failed, Please try again';
    } else this.errorMsg();
  }

  async errorMsg() {
    (this.pwError = ''), (this.cpwError = '');
    const pwErrors = this.password.errors;
    const pwValue = this.password.value;
    const cpwValue = this.confirmpassword.value;
    const confirmPwErrors = this.confirmpassword.errors;
    if (pwErrors) this.pwError = await this.errorService.pwError(pwErrors);
    if (confirmPwErrors)
      this.cpwError = await this.errorService.pwError(confirmPwErrors);
    if (pwValue !== cpwValue && !pwErrors && !confirmPwErrors)
      this.cpwError = 'passwords dont match';
  }

  togglePw(field: 'showPw' | 'showCpw') {
    this[field] = !this[field];
  }
}
