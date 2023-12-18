import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workplan } from 'src/app/models/workplan';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-workplan-edit-dialog',
  templateUrl: './workplan-edit-dialog.component.html',
  styleUrls: ['./workplan-edit-dialog.component.css']
})
export class WorkplanEditDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WorkplanEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Workplan,
    private workplanService: WorkplanService
  ) {
    this.formInstance = new FormGroup({
      'id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'worksite': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required)
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {}

  save(): void {
    const updatedWorkplan = new Workplan(
      this.data.id,
      this.formInstance.value.name,
      this.formInstance.value.startDate,
      this.formInstance.value.endDate,
      this.formInstance.value.description,
      this.formInstance.value.worksite,
      this.formInstance.value.status
    );

    this.workplanService.updateWorkplan(updatedWorkplan).subscribe(
      updatedWorkplan => {
        this.dialogRef.close(updatedWorkplan);
      },
      error => {
        console.error('Error updating workplan', error);
      }
    );
  }
}
