import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input('cols') public cols: string = ''
  @Input('title') public title: string = ''
  @Input('color') public color: string = ''
  @Input('icon') public icon: string = ''
  @Input('value') public value: number = 0

  constructor() { }

  public ngOnInit(): void {
  }

}
