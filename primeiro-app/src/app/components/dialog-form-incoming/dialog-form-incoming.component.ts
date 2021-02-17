import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Register } from 'src/app/models/models';

@Component({
  selector: 'app-dialog-form-incoming',
  templateUrl: './dialog-form-incoming.component.html',
  styleUrls: ['./dialog-form-incoming.component.scss']
})
export class DialogFormIncomingComponent implements OnInit {

  public type: string = ''
  public label: string = ''
  public value: string | number
  public edit: boolean | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Register,
    private _dialogRef: MatDialogRef<DialogFormIncomingComponent>
  ) { }

  public ngOnInit(): void {
    this.type = this.data.type
    this.value = this.data.value
    this.edit = this.data.edit
    this.data.type === 'incoming' ? this.label = "Entrada" : this.label = "Saída"
  }

  public listeningEventForm(event: any): void {
    if (event === 'close') {
      this._dialogRef.close()
    }
  }
}
