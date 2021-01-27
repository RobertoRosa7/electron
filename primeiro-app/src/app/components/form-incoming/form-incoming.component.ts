import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-incoming',
  templateUrl: './form-incoming.component.html',
  styleUrls: ['./form-incoming.component.scss']
})
export class FormIncomingComponent implements OnInit {
  @Input('label') public label: string = ''
  @Input('placeholder') public placeholder: string = ''
  @Input('type') public type: string = ''
  
  public form: FormGroup

  constructor(
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      value: []
    })
  }

  ngOnInit(): void {
  }

}
