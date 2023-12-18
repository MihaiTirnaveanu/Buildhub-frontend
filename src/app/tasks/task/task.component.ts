// task.component.ts
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Task } from "src/app/models/task";
import { TaskService } from "src/app/services/task.service";
import { TaskCreateDialogComponent } from "../task-create-dialog/task-create-dialog.component";
import { TaskEditDialogComponent } from "../task-edit-dialog/task-edit-dialog.component";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  edit(task: Task) {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.getAllTasks().subscribe(
          tasks => {
            this.tasks = tasks;
          }
        );
        console.log('Task updated successfully', result);
      }
    });
  }

  delete(taskId: number): void {
    this.taskService.deleteTaskById(taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.getAllTasks().subscribe(
          tasks => {
            this.tasks = tasks;
          }
        );
        console.log('Task created successfully', result);
      }
    });
  }
}
