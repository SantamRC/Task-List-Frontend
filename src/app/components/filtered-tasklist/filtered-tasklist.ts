import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskModel } from '../../models/task.model';
import { TasklistService } from '../../service/tasklist';
import { TaskFormComponent } from '../form/form'

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-filtered-tasklist',
  styleUrl: 'filtered-tasklist.scss',
  templateUrl: 'filtered-tasklist.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
})
export class FilteredTaskListComponent implements AfterViewInit {
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  // dataSource: MatTableDataSource<UserData>;
  displayedColumns: string[] = ['title', 'task_type', 'entity_name','contact_person', 'due_date', 'description','status','actions'];

  dataSource = new MatTableDataSource<TaskModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tasklistService: TasklistService,private dialog: MatDialog,private snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.tasklistService.getTasks().subscribe((tasks: TaskModel[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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