import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Register } from 'src/app/models/models';

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
  @Input('description') public description: string | undefined = ''
  @Input('payload') public payload: Register
  @Input('date') public date: number
  @Input('category') public category: string | undefined = ''

  @Output() public send = new EventEmitter()

  public form: FormGroup
  public isDisabled: boolean = true
  public isMobile: boolean
  public charTotal: number = 50
  public charCount: number = 50
  public categories = [
    'Banco',
    'Alimentação',
    'Vestuário',
    'Transporte',
    'Água & Luz'
  ]

  constructor(
    private _fb: FormBuilder,
    private _breakpoint: BreakpointObserver
  ) {
    this.form = this._fb.group({ value: [''], date: [new Date()], description: '', category: [''] })
    this._breakpoint.observe([Breakpoints.XSmall]).subscribe(result => this.isMobile = !!result.matches)
  }

  public ngOnInit(): void {
    if (this.edit) {
      this.form.patchValue({
        value: this.value,
        description: this.description,
        date: new Date(this.date),
        category: this.category
      })
      let totalString = this.description?.length || 0
      this.charCount = (this.charTotal - totalString)
    }

    this.form.get('value')?.valueChanges.subscribe(val => this.isDisabled = !val)
    this.form.get('description')?.valueChanges.subscribe(text => {
      if (text) {
        this.charCount = (this.charTotal - text.length)
      }
    })
  }

  public onSubmit(_: any, type: string): void {
    const payload = {
      created_at: new Date(this.form.value.date).getTime(),
      value: this.form.value.value,
      description: this.form.value.description,
      category: this.form.value.category,
      type
    }

    switch (type) {
      case this.type:
        this.form.get('value')?.reset()
        this.form.get('description')?.reset()
        this.form.get('category')?.reset()
        break
    }
    this.send.emit(payload)
  }

  public close(options?: any): void {
    this.send.emit(options)
  }
}
