import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Register } from '../../models/models'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/registers.actions'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: Register[] = []

  public displayedColumns: string[] = ['position', 'category', 'value', 'date', 'actions']
  public dataSource: any

  @ViewChild(MatSort) public sort: MatSort

  constructor(
    private _snackbar: MatSnackBar,
    private _store: Store,
  ) {
    this._store.dispatch(actions.INIT())
  }

  public ngOnInit(): void {
    this._store.select(({ registers }: any) => [...registers.all]).subscribe(register => {
      this.ELEMENT_DATA = register
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.dataSource.sort = this.sort
    })
  }

  public ngAfterViewInit(): void { }

  public listeningEventForm(event: any): void {
    let name: string = event['operation'] === 'incoming' ? 'Entrada' : 'Saída'
    let position = ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1)
    this._snackbar.open(`Registro de "${name}" foi criado com sucesso.`, 'Ok', { duration: 3000 })
    this._store.dispatch(actions.ADD_REGISTERS({
      payload: {
        position,
        category: 'Outros',
        date: event.created_at,
        type: event.operation,
        value: event.value,
        status: 'pending',
        id: position
      }
    }))
  }

  public openDetails(event: Event, payload: Register): void {
    event.stopPropagation()
    console.log('open details: ', payload)
  }

  public edit(event: Event, payload: Register): void {
    event.stopPropagation()
    console.log('edit: ', payload)
  }

  public del(event: Event, payload: Register): void {
    event.stopPropagation()
    this._store.dispatch(actions.DELETE_REGISTERS({ payload }))
  }

}
