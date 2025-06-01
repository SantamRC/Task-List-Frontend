import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Tasklist } from './components/tasklist/tasklist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Tasklist],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Frontend';
}
