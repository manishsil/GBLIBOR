import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  options: string[];
  selectedText: string;
  customText: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.options = this.data.split('|');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    console.log(this.customText);
    let modText;
    if (this.customText) {
      modText = this.customText;
    } else {
      modText = this.selectedText;
    }
    this.dialogRef.close(modText);
  }

}
