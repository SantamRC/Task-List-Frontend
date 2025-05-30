import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, TasklistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
