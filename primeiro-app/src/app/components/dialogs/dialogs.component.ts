import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  @ViewChild('contentDialog', { static: false }) public contentDialog: ElementRef

  constructor() { }

  ngOnInit(): void {
  }
}
