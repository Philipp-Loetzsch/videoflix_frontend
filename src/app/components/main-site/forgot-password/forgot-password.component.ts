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

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(private router: Router, private errorService : ErrorsService) {}
  emailError: string = '';
  submitted: boolean = false;

  forgotPwForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  onSubmit() {
    this.submitted = true;
    if (this.forgotPwForm.valid) {
      console.log(`Es wird eine Email an ${this.email.value} gesendet`);
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
