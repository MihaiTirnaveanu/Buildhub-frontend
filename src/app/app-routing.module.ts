import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplanComponent } from './workplans/workplan/workplan.component';
import { GanttComponent } from './gantt/gantt.component';

const routes: Routes = [
  {path: '', component: GanttComponent},
  {path: "workplans", component: WorkplanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
