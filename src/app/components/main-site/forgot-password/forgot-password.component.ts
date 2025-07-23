import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { ErrorsService } from '../../../services/errors.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(private router: Router, private errorService : ErrorsService, private authService: AuthService) {}
  emailError: string = '';
  submitted: boolean = false;

  forgotPwForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  async onSubmit() {
    this.submitted = true;
    if (this.forgotPwForm.valid && this.forgotPwForm.value.email) {
      console.log(`Es wird eine Email an ${this.email.value} gesendet`);
      await this.authService.forgotPassword(this.forgotPwForm.value.email)
    } else this.errorMsg();
  }

  get email(): FormControl {
    return this.forgotPwForm.get('email') as FormControl;
  }

  async errorMsg() {
    this.emailError = '';
    const emailErrors = this.email.errors;
    if (emailErrors) this.emailError = await this.errorService.emailError(emailErrors);
  }
}
