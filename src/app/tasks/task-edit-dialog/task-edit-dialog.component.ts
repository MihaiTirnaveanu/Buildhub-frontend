import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css'],
  providers: [DatePipe]
})
export class TaskEditDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    this.formInstance = new FormGroup({
      'id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'duration': new FormControl('', Validators.required),
      'resources': new FormControl('', Validators.required),
      'objectiveIds': new FormControl(''),
      'crewIds': new FormControl('')
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {}

  save(): void {
    const startDate: Date | null = this.formInstance.value.startDate;
    const endDate: Date | null = this.formInstance.value.endDate;

    if (!startDate || !endDate) {
      console.error('Start Date and End Date are required');
      return;
    }

    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd') || '';
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd') || '';

    const updatedTask = new Task(
      this.data.id,
      this.formInstance.value.name,
      new Date(formattedStartDate),
      new Date(formattedEndDate),
      this.formInstance.value.description,
      this.formInstance.value.duration,
      this.formInstance.value.resources,
      [], 
      []     
    );

    this.taskService.updateTask(updatedTask).subscribe(
      updatedTask => {
        this.dialogRef.close(updatedTask);
      },
      error => {
        console.error('Error updating task', error);
      }
    );
  }
}
