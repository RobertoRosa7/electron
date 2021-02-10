import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-incoming',
  templateUrl: './form-incoming.component.html',
  styleUrls: ['./form-incoming.component.scss']
})
export class FormIncomingComponent implements OnInit {
  @Input('label') public label: string = ''
  @Input('placeholder') public placeholder: string = ''
  @Input('type') public type: string = ''
  @Input('value') public value: string | number
  @Input('edit') public edit: boolean | undefined

  @Output() public send = new EventEmitter()

  public form: FormGroup
  public isDisabled: boolean = true
  public isMobile: boolean

  constructor(
    private _fb: FormBuilder,
    private _breakpoint: BreakpointObserver
  ) {
    this.form = this._fb.group({ value: [''], date: [new Date()] })
    this._breakpoint.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)

  }

  public ngOnInit(): void {
    this.form.get('value')?.valueChanges.subscribe(val => this.isDisabled = !val)
    if (this.edit) this.form.patchValue({ value: this.value })
  }

  public onSubmit(_: any, type: string): void {
    const payload = {
      created_at: new Date(this.form.value.date).getTime(),
      value: this.form.value.value,
      type
    }

    switch (type) {
      case this.type:
        this.form.get('value')?.reset()
        break
    }
    this.send.emit(payload)
  }

}
