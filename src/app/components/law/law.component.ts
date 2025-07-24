import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-law',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './law.component.html',
  styleUrl: './law.component.scss'
})
export class LawComponent {

  constructor(private location: Location) { }

  isMobile: boolean = false

  back() {
    console.log('hi');
    
    this.location.back();
  }
}
