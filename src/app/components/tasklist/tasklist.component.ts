import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Task} from '../../models/task.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const data:Task[]=[
    {
        contact_person: "Alice",
        description: "Complete by next week",
        due_date: "2025-06-15",
        entity_name: "Project X",
        id: 34,
        status: "In Progress",
        task_type: "Development",
        title: "Finish project",
        user_id: 1
    },
    {
        "contact_person": "Alice",
        "description": "Complete by next week",
        "due_date": "2025-06-15",
        "entity_name": "Project X",
        "id": 35,
        "status": "In Progress",
        "task_type": "Development",
        "title": "Finish project 2",
        "user_id": 1
    }
]

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss',
  imports: [MatTableModule]
})
export class TasklistComponent {
  displayedColumns: string[] = ['contact_person', 'description', 'due_date', 'entity_name', 'id', 'status', 'task_type', 'title', 'user_id'];
  dataSource = data;
}