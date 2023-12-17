import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { gantt } from 'dhtmlx-gantt';

@Component({
    providers: [TaskService, LinkService],
    encapsulation: ViewEncapsulation.None,
    selector: 'app-gantt',
    styleUrls: ['./gantt.component.css'],
    templateUrl: "./gantt.component.html",
})

export class GanttComponent implements OnInit{
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    constructor(private taskService: TaskService, private linkService: LinkService){}

    ngOnInit(){
        gantt.config.date_format = '%Y-%m-%d %H:%i';

        gantt.init(this.ganttContainer.nativeElement);

        Promise.all([this.taskService.get(), this.linkService.get()])
        .then(([data, links]) => {
          gantt.parse({data, links});
        });
    }
}