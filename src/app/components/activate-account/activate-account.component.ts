import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  isMobile: boolean = false;
  token: string = '';
  errorMsg: string = ''

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if(this.token) this.activateAccount()
    else throw new Error ('invalid token')
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth <= 1025;
  }

  async activateAccount() {
    try {
      const isActivated = await this.authservice.activateAccount(this.token);
       if(isActivated){
        setTimeout(() => {
          this.router.navigate(['/log_in'])
        }, 2000);
       }
    } catch (error) {
      this.errorMsg = 'Oops your account could not activate'
    }
   
  }
}
