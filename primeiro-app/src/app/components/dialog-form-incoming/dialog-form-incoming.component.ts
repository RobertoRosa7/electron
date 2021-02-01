import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-form-incoming',
  templateUrl: './dialog-form-incoming.component.html',
  styleUrls: ['./dialog-form-incoming.component.scss']
})
export class DialogFormIncomingComponent implements OnInit {

  public type: string = ''
  public label: string = this.type === 'incoming' ? "Entrada" : "Saída"

  constructor() { }

  ngOnInit(): void {
  }

}
