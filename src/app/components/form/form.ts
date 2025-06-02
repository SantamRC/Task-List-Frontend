import { Component, Inject,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent  } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { TasklistService } from '../../service/tasklist';

@Component({
  selector: 'app-task-form',
  templateUrl: './form.html',
  styleUrls: ['./form.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogContent, MatFormFieldModule, MatSelectModule, ReactiveFormsModule,MatInputModule, MatDatepickerModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TasklistService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'update'; task?: any }
  ) {
    this.taskForm = this.fb.group({
      title: [data.task?.title || '', Validators.required],
      task_type: [data.task?.task_type || '', Validators.required],
      contact_person: [data.task?.contact_person || '', Validators.required],
      due_date: [
        data.task?.due_date ? data.task.due_date.split('T')[0] : '',
        Validators.required
      ],
      description: [data.task?.description || '', Validators.required],
      entity_name: [data.task?.entity_name || '', Validators.required],
      status: [data.task?.status || '', Validators.required],
      user_id: 1 // By default, this value is set to 1
    });

    console.log('TaskFormComponent initialized with data:', data);
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

  // Convert due_date to "YYYY-M-D"
  const dueDate: Date = new Date(formValue.due_date);
  const formattedDueDate = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-${dueDate.getDate()}`;

  const taskData = {
    ...formValue,
    due_date: formattedDueDate,
  };


    if (this.data.mode === 'create') {
      this.taskService.createTask(taskData).subscribe({
        next: (res) => {
          console.log('Task created successfully:', res.status);
          this.dialogRef.close(true)
          window.location.reload()
        },
        error: (err) => console.error('Error creating task:', err)
      });
      //console.log('Creating task with data:', taskData);
    } else if (this.data.mode === 'update' && this.data.task?.id) {
      this.taskService.updateTask(this.data.task.id, taskData).subscribe({
        next: (res) => {
          console.log('Task updated successfully:', res.status);
          this.dialogRef.close(true)
          window.location.reload()
        },
        error: (err) => console.error('Error updating task:', err)
      });
      console.log('Updating task with ID:', this.data.task.id, 'and data:', taskData);
    }
  }
}
