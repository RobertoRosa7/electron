import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Register } from '../../models/models'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/registers.actions'
import { UtilsService } from 'src/app/utils/utis.service'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: Register[] = []

  public displayedColumns: string[] = ['position', 'category', 'value', 'created_at', 'actions']
  public dataSource: any

  @ViewChild(MatSort) public sort: MatSort

  constructor(
    private _snackbar: MatSnackBar,
    private _store: Store,
    private _utils: UtilsService
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

  public listeningEventForm(event: Register): void {
    let name: string = event.type === 'incoming' ? 'Entrada' : 'Saída'
    let position = ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1)
    this._snackbar.open(`Registro de "${name}" foi criado com sucesso.`, 'Ok', { duration: 3000 })

    const payload: Register = {
      position,
      category: 'Outros',
      created_at: event.created_at,
      type: event.type,
      value: event.value,
      status: 'pending',
      id: this._utils.generateUid()
    }
    this._store.dispatch(actions.ADD_REGISTERS({ payload }))
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

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(valor)
  }

}
