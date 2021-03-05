import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_DATA, Register } from 'src/app/models/models';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  @ViewChild('contentDialog', { static: false }) public contentDialog: ElementRef
  public type: string = ''
  public detail: Register

  constructor(
    @Inject(MAT_DIALOG_DATA) public DIALOG_DATA: DIALOG_DATA,
    private _dialogRef: MatDialogRef<DialogsComponent>,

  ) { }

  public ngOnInit(): void {
    switch (this.DIALOG_DATA.type) {
      case 'details':
        this.type = this.DIALOG_DATA.type
        this.detail = this.DIALOG_DATA.data
        break
    }
  }

  public close() {
    this._dialogRef.close()
  }
}
