import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { PeriodicElement } from '../../models/models'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: PeriodicElement[] = [
    // { position: 1, category: 'Hydrogen', date: new Date().getTime(), value: 1.0079, type: 'incoming' },
    // { position: 2, category: 'Helium', date: new Date().getTime(), value: 4.0026, type: 'incoming' },
    // { position: 3, category: 'Lithium', date: new Date().getTime(), value: 6.941, type: 'incoming' },
    // { position: 4, category: 'Beryllium', date: new Date().getTime(), value: 9.0122, type: 'incoming' },
    // { position: 5, category: 'Boron', date: new Date().getTime(), value: 10.811, type: 'outcoming' },
    // { position: 6, category: 'Carbon', date: new Date().getTime(), value: 2.0107, type: 'incoming' },
    // { position: 7, category: 'Nitrogen', date: new Date().getTime(), value: 4.0067, type: 'incoming' },
    // { position: 8, category: 'Oxygen', date: new Date().getTime(), value: 5.9994, type: 'incoming' },
    // { position: 9, category: 'Fluorine', date: new Date().getTime(), value: 8.9984, type: 'incoming' },
    // { position: 10, category: 'Neon', date: new Date().getTime(), value: 0.1797, type: 'incoming' },
  ]

  public displayedColumns: string[] = ['position', 'category', 'value', 'date']
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA)

  @ViewChild(MatSort) public sort: MatSort

  constructor(
    private _sn: MatSnackBar
  ) {
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  public listeningEventForm(event: any): void {
    let name: string = event['operation'] === 'incoming' ? 'Entrada' : 'Saída'
    let position = ((this.ELEMENT_DATA.length - 1) < 0) ? 1 : (this.ELEMENT_DATA.length + 1)

    this._sn.open(`Registro de "${name}" foi criado com sucesso.`, 'Ok', { duration: 3000 })
    this.ELEMENT_DATA.push({
      position,
      category: 'Alimentação',
      date: event['created_at'],
      type: event['operation'],
      value: event['value']
    })

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
  }

  public getRowTable(row: any): void {
    console.log(row)
  }

}
