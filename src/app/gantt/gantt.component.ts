import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { gantt } from 'dhtmlx-gantt';
import { Task } from '../models/task';

@Component({
    providers: [TaskService],
    encapsulation: ViewEncapsulation.None,
    selector: 'app-gantt',
    styleUrls: ['./gantt.component.css'],
    templateUrl: "./gantt.component.html",
})

export class GanttComponent implements OnInit{
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    constructor(private taskService: TaskService){}

    ngOnInit(){
        gantt.config.date_format = '%Y-%m-%d %H:%i';

    gantt.init(this.ganttContainer.nativeElement);

    this.taskService.getAllTasks()
            .subscribe((tasks: Task[]) => {
                const formattedTasks = tasks.map(task => ({
                    id: task.id,
                    text: task.name,
                    start_date: new Date(task.startDate).toISOString().slice(0, 19).replace("T", " "),
                    end_date: new Date(task.endDate).toISOString().slice(0, 19).replace("T", " "),
                    name: task.name,
                    description: task.description,
                    duration: task.duration,
                    progress: 0,
                    parent: 0
                }));

                gantt.parse({ data: formattedTasks });
            });
    }
}