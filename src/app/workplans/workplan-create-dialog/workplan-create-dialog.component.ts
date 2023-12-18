import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workplan } from 'src/app/models/workplan';
import { WorkplanService } from 'src/app/services/workplan.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workplan-create-dialog',
  templateUrl: './workplan-create-dialog.component.html',
  styleUrls: ['./workplan-create-dialog.component.css'],
  providers: [DatePipe]
})
export class WorkplanCreateDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WorkplanCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Workplan,
    private workplanService: WorkplanService,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "startDate": new FormControl('', Validators.required),
      "endDate": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "worksite": new FormControl('', Validators.required),
      "status": new FormControl('', Validators.required)
    });
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

    const newWorkplan = new Workplan(
      NaN,
      this.formInstance.value.name,
      new Date(formattedStartDate),
      new Date(formattedEndDate),
      this.formInstance.value.description,
      this.formInstance.value.worksite,
      this.formInstance.value.status
    );

    this.workplanService.createWorkplan(newWorkplan).subscribe(
      createdWorkplan => {
        this.dialogRef.close(createdWorkplan);
      },
      error => {
        console.error('Error creating workplan', error);
      }
    );
  }
}
