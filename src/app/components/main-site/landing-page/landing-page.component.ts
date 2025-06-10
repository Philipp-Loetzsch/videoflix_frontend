import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ErrorsService } from '../../../services/errors.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private errorService: ErrorsService,
    private authService: AuthService
  ) {}
  emailError: string = '';
  errorMessage:string | null = null
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  ngOnInit(): void {
    this.loginForm.setValue({ email: '' });
  }

  async onSubmit() {
    if (this.loginForm.valid && this.loginForm.value.email) {
      try{
      let check = await this.authService.checkEmail(this.loginForm.value.email)
      if (!check) this.router.navigate(['/sign_up']);
      else this.router.navigate(['/log_in']);
      }
      catch(error:any){
         this.errorMessage = error.message || 'Ein unbekannter Fehler ist aufgetreten.';
         console.log(this.errorMessage);
         
      }
    } else {
      this.errorMsg();
    }
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  async errorMsg() {
    const emailErrors = this.email.errors;
    if (emailErrors)
      this.emailError = await this.errorService.emailError(emailErrors);
  }
}
