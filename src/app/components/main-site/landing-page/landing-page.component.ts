import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
constructor( private router: Router) {
  
}

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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('E-Mail:', this.loginForm.value.email);
      this.router.navigate(['/sign_up'])
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
    get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
}
