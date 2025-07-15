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
import { ErrorsService } from '../../../services/errors.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  constructor(
    private router: Router,
    private errorService: ErrorsService,
    private authService: AuthService
  ) {
    this.currentEmail = this.authService.currentEmail;
  }

  submitted: boolean = false;
  showPw: boolean = false;
  emailError: string = '';
  pwError: string = '';
  currentEmail: string = '';
  errorMessage: string | null = null;

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

  ngOnInit(): void {
    if (this.authService.currentEmail) {
      this.loginForm.patchValue({
        email: this.authService.currentEmail,
      });
    }
  }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const result = await this.authService.logIn(this.loginForm);

      if (result === true) {
        this.router.navigate(['/offers']);
      } else if (result instanceof Error) {
        this.errorMessage = result.message;
      } else if (Array.isArray(result)) {
        this.errorMessage = result[0];
      } else if (result && Array.isArray(result)) {
        this.errorMessage = result[0];
      } else {
        this.errorMessage = 'Unbekannter Fehler';
      }
    } else this.errorMsg();
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  togglePw() {
    this.showPw = !this.showPw;
  }

  async errorMsg() {
    const emailErrors = this.email.errors;
    const pwErrors = this.password.errors;
    if (emailErrors)
      this.emailError = await this.errorService.emailError(emailErrors);
    if (pwErrors) this.pwError = await this.errorService.pwError(pwErrors);
  }
}
