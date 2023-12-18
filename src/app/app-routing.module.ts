import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplanComponent } from './workplans/workplan/workplan.component';
import { GanttComponent } from './gantt/gantt.component';
import { TaskComponent } from './tasks/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskComponent },  
  { path: 'workplans', component: WorkplanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
