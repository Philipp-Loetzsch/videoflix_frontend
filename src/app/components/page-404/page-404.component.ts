import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss',
})
export class Page404Component {
  constructor(private router: Router) {}
  isMobile: boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth <= 1025;
  }
}
