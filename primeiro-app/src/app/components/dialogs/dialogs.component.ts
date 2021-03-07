import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgNavigatorShareService } from 'ng-navigator-share';
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
  private naviShareService: NgNavigatorShareService

  constructor(
    @Inject(MAT_DIALOG_DATA) public DIALOG_DATA: DIALOG_DATA,
    private _dialogRef: MatDialogRef<DialogsComponent>,
    private _naviShareService: NgNavigatorShareService
  ) {
    this.naviShareService = this._naviShareService
  }

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

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }

  public async btnShare(): Promise<any> {
    console.log('Share')
    // try {
    //   const sharedResponse = await this.naviShareService.share({
    //     title: '`Web Articles and Tutorials',
    //     text: 'Check out my blog — its worth looking.',
    //     url: 'www.codershood.info'
    //   });
    //   console.log(sharedResponse);
    // } catch (error) {
    //   console.log('You app is not shared, reason: ', error);
    // }

  }

  public btnSave(): void {
    console.log('Save')
  }

  public btnDownload(): void {
    console.log('Download')
  }

  public edit(item: Register): void {
    this._dialogRef.close({ operation: 'edit', payload: item })
  }

  public del(item: Register): void {
    this._dialogRef.close({ operation: 'del', payload: item })
  }
}
