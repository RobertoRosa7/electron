import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgNavigatorShareService } from 'ng-navigator-share'
import { DIALOG_DATA, Register } from 'src/app/models/models'
import html2canvas, { Options } from 'html2canvas'

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
    //   })
    //   console.log(sharedResponse)
    // } catch (error) {
    //   console.log('You app is not shared, reason: ', error)
    // }
  }

  public btnSave(): void {
    console.log('Save')
  }

  public btnDownload(detail: Register): void {
    const currentTheme = localStorage.getItem('user-theme')
    const color: string = (currentTheme == 'light-mode') ? '#fafafa' : '#303030'
    const al: HTMLElement = document.createElement('div')
    const el: HTMLElement = document.querySelector('.content-dialog') || al
    if (el) {
      html2canvas(el, { backgroundColor: color }).then(canvas => {
        // document.body.appendChild(canvas)
        var a = document.createElement('a');
        a.href = canvas.toDataURL()
        a.download = `${detail.description}-${new Date().getTime()}.png`;
        a.click()
      })
    }
  }

  public edit(item: Register): void {
    this._dialogRef.close({ operation: 'edit', payload: item })
  }

  public del(item: Register): void {
    this._dialogRef.close({ operation: 'del', payload: item })
  }
}
