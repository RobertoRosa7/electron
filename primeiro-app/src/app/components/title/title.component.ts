import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() public title: string | number
  @Input() public subtitle: string | number
  
  constructor() { }

  ngOnInit(): void {
  }

}
