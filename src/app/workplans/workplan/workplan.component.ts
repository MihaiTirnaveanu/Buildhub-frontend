import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Workplan } from "src/app/models/workplan";
import { WorkplanService } from "src/app/services/workplan.service";
import { WorkplanEditDialogComponent } from "../workplan-edit-dialog/workplan-edit-dialog.component";
import { WorkplanCreateDialogComponent } from "../workplan-create-dialog/workplan-create-dialog.component";

@Component({
  selector: 'app-workplan',
  templateUrl: './workplan.component.html',
  styleUrls: ['./workplan.component.css']
})
export class WorkplanComponent implements OnInit {
  workplans: Workplan[] = [];

  constructor(
    private workplanService: WorkplanService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workplanService.getAllWorkplans().subscribe(data => {
      this.workplans = data;
    });
  }

  edit(workplan: Workplan) {
    const dialogRef = this.dialog.open(WorkplanEditDialogComponent, {
      width: '400px',
      data: workplan
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workplanService.getAllWorkplans().subscribe(
          workplans => {
            this.workplans = workplans;
          }
        );
        console.log('Workplan updated successfully', result);
      }
    });
  }

  delete(workplanId: number): void {
    this.workplanService.deleteWorkplan(workplanId).subscribe(
      () => {
        console.log('Workplan deleted successfully');
        this.workplans = this.workplans.filter(workplan => workplan.id !== workplanId);
      },
      (error) => {
        console.error('Error deleting workplan:', error);
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(WorkplanCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workplanService.getAllWorkplans().subscribe(
          workplans => {
            this.workplans = workplans;
          }
        );
        console.log('Workplan created successfully', result);
      }
    });
  }
}
