import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../form/form'

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(private dialog: MatDialog) {}
  
  openCreateTaskDialog() {
      this.dialog.open(TaskFormComponent, {
        width: '500px',
        data: { mode: 'create' } // Used to differentiate between create/update
      });
    }
}
