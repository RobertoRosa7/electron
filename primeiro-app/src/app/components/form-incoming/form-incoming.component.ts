import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-incoming',
  templateUrl: './form-incoming.component.html',
  styleUrls: ['./form-incoming.component.scss']
})
export class FormIncomingComponent implements OnInit {
  @Input('label') public label: string = ''
  @Input('placeholder') public placeholder: string = ''
  @Input('type') public type: string = ''
  @Output() public send = new EventEmitter()

  public form: FormGroup
  public isDisabled: boolean = true

  constructor(
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({ value: [''] })
  }

  public ngOnInit(): void {
    this.form.get('value')?.valueChanges.subscribe(val => this.isDisabled = !val)
  }

  public onSubmit(_: any, type: string): void {
    const payload = {
      created_at: new Date().getTime(),
      value: this.form.value.value,
      operation: type
    }

    switch (type) {
      case this.type:
        this.form.reset()
        break
    }

    this.send.emit(payload)
  }

}
