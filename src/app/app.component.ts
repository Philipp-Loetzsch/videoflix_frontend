import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSiteComponent } from "./components/main-site/main-site.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainSiteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix_frontend';
}
