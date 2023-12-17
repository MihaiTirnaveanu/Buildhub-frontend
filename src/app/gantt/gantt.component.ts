import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { gantt } from 'dhtmlx-gantt';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-gantt',
    styleUrls: ['./gantt.component.css'],
    templateUrl: "./gantt.component.html",
})

export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    ngOnInit(){
        gantt.init(this.ganttContainer.nativeElement);
    }
}