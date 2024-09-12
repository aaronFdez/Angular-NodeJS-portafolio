import {Component} from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
      this.title = "Aaron Fdez Garcia";
      this.subtitle = "Desarrollador Web, Senior Full Stack";
      this.email = "aaronfdez@gmail.com";
  }
}
