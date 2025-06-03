import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Tasklist } from './components/tasklist/tasklist';
import { FilteredTaskListComponent } from './components/filtered-tasklist/filtered-tasklist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Tasklist, FilteredTaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Frontend';
}
