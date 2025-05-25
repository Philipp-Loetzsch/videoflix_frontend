import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-main-site',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-site.component.html',
  styleUrl: './main-site.component.scss'
})
export class MainSiteComponent {
  backgroundClass = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const path = this.router.url;
      if (path.includes('')) {
        this.backgroundClass = 'landing-bg';
      } else if (path.includes('log_in')) {
        this.backgroundClass = 'login-bg';
      } else if (path.includes('sign_in')) {
        this.backgroundClass = 'signin-bg';
      } else if (path.includes('forgot_password')) {
        this.backgroundClass = 'forgot-bg';
      } else {
        this.backgroundClass = 'default-bg';
      }
    });
  }


}
