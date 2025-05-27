import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  dNone: string = '';
  isMobile: boolean = false

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const path = this.router.url;
      if (path.includes('/log_in')) {
        this.backgroundClass = 'login-bg';
        this.dNone = 'd-none'
      } else if (path.includes('/sign_up')) {
        this.backgroundClass = 'signin-bg';
      } else if (path.includes('/forgot_password')) {
        this.backgroundClass = 'forgot-bg';
      } else {
        this.backgroundClass = 'landing-bg';
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth <= 1025;
  }
}
