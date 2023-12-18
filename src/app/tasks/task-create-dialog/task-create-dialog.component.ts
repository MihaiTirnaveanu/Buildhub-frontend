import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.css'],
  providers: [DatePipe] // Add DatePipe as a provider
})
export class TaskCreateDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "startDate": new FormControl('', Validators.required),
      "endDate": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "duration": new FormControl('', Validators.required),
      "resources": new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  save(): void {
    const startDate: Date | null = this.formInstance.value.startDate;
    const endDate: Date | null = this.formInstance.value.endDate;
  
    if (!startDate || !endDate) {
      // Handle the case where either startDate or endDate is null
      console.error('Start Date and End Date are required');
      return;
    }
  
    const formattedStartDate: string = this.datePipe.transform(startDate, 'yyyy-MM-dd') || '';
    const formattedEndDate: string = this.datePipe.transform(endDate, 'yyyy-MM-dd') || '';
  
    const newTask = new Task(
      NaN,
      this.formInstance.value.name,
      new Date(formattedStartDate),
      new Date(formattedEndDate),
      this.formInstance.value.description,
      this.formInstance.value.duration,
      this.formInstance.value.resources,
      [],
      []
    );
  
    this.taskService.createTask(newTask).subscribe(
      createdTask => {
        this.dialogRef.close(createdTask);
      },
      error => {
        console.error('Error creating task', error);
      }
    );
  }
  
  
}
