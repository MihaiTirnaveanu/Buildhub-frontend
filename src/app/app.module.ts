import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttComponent } from './gantt/gantt.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkplanComponent } from './workplans/workplan/workplan.component';
import { WorkplanService } from './services/workplan.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { WorkplanCreateDialogComponent } from './workplans/workplan-create-dialog/workplan-create-dialog.component';
import { WorkplanEditDialogComponent } from './workplans/workplan-edit-dialog/workplan-edit-dialog.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskEditDialogComponent } from './tasks/task-edit-dialog/task-edit-dialog.component';
import { TaskCreateDialogComponent } from './tasks/task-create-dialog/task-create-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    NavbarComponent,
    WorkplanComponent,
    WorkplanCreateDialogComponent,
    WorkplanEditDialogComponent,
    TaskComponent,
    TaskCreateDialogComponent,
    TaskEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [WorkplanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
