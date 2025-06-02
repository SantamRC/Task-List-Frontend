import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskModel } from '../../models/task.model';
import { TasklistService } from '../../service/tasklist';
import { TaskFormComponent } from '../form/form'

@Component({
  selector: 'app-tasklist',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.scss'
})
export class Tasklist {
  displayedColumns: string[] = ['title', 'task_type', 'entity_name','contact_person', 'due_date', 'description','status','actions'];

  dataSource = new MatTableDataSource<TaskModel>();

  constructor(private tasklistService: TasklistService,private dialog: MatDialog,private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.tasklistService.getTasks().subscribe((tasks: TaskModel[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEdit(task: TaskModel) {
    console.log('Edit clicked for:', task);
     this.dialog.open(TaskFormComponent, {
            width: '500px',
            data: { mode: 'update', task: task } // Used to differentiate between create/update
          });
  }

  onDelete(task: TaskModel) {
    console.log('Delete clicked for:', task);
    // confirm & call API to delete
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this task?', 'Yes', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['confirm-snackbar'] // optional for styling
    });

    snackBarRef.onAction().subscribe(() => {
      // User clicked "Yes"
      this.tasklistService.deleteTask(task.id).subscribe({
        next: () => {
          this.snackBar.open('Task deleted successfully!', '', { duration: 2000 });
          window.location.reload()
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.snackBar.open('Failed to delete task.', '', { duration: 2000 });
        }
      });
    });
  }

}