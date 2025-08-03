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
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private router: Router, private errorService: ErrorsService, private authService: AuthService) {
    this.currentEmail = this.authService.currentEmail
  }

  showPw: boolean = false;
  showCpw: boolean = false;
  submitted: boolean = false;
  emailError: string = '';
  pwError: string = '';
  cpwError: string = '';
  currentEmail: string = ''
  signInErrorMsg: string = ''
  success: string = ""

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

  ngOnInit(): void {

    if (this.authService.currentEmail) {
      this.signinForm.patchValue({
        email: this.authService.currentEmail
      });
    }
  }

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

  async onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid && this.signinForm.value) {
      const registrated = await this.authService.createUser(this.signinForm)
      if (registrated === true) { 
        this.success = `Sign in successful. Please check your emails`
        setTimeout(() => this.router.navigate(['/log_in']), 4000);
      }
      else if (registrated instanceof Error) {
        this.signInErrorMsg = registrated.message;
      } else if (registrated && !Array.isArray(registrated) && typeof registrated === 'object') {
        const errors = registrated as Record<string, string[]>;
        const firstKey = Object.keys(errors)[0];
        this.signInErrorMsg = errors[firstKey][0];
      } else {
        this.signInErrorMsg = 'Unknown Error';
      }
    } else this.errorMsg();

  }

  async errorMsg() {
    this.emailError = '', this.pwError = '', this.cpwError = '';
    const emailErrors = this.email.errors;
    const pwErrors = this.password.errors;
    const pwValue = this.password.value;
    const cpwValue = this.confirmpassword.value;
    const confirmPwErrors = this.confirmpassword.errors;
    if (emailErrors) this.emailError = await this.errorService.emailError(emailErrors)
    if (pwErrors) this.pwError = await this.errorService.pwError(pwErrors);
    if (confirmPwErrors) this.cpwError = await this.errorService.pwError(confirmPwErrors)
    if (pwValue !== cpwValue && !pwErrors && !confirmPwErrors) this.cpwError = 'passwords dont match';
  }

  togglePw(field: 'showPw' | 'showCpw') {
    this[field] = !this[field];
  }
}
