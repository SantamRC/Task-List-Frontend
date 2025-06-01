import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TaskModel } from '../../models/task.model';
import { TasklistService } from '../../service/tasklist';

@Component({
  selector: 'app-tasklist',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.scss'
})
export class Tasklist {
  displayedColumns: string[] = ['title', 'task_type', 'contact_person', 'due_date', 'description','status'];


  dataSource = new MatTableDataSource<TaskModel>();


  constructor(private tasklistService: TasklistService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.tasklistService.getTasks().subscribe((tasks: TaskModel[]) => {
      console.log(tasks);
      //this.taskData = tasks;
      this.dataSource.data = tasks;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}