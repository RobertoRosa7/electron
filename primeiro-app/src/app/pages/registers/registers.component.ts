import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

export interface PeriodicElement {
  category: string
  position: number
  date: number
  value: number
}

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})

export class RegistersComponent implements OnInit, AfterViewInit {
  private ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, category: 'Hydrogen', date: new Date().getTime(), value: 1.0079 },
    { position: 2, category: 'Helium', date: new Date().getTime(), value: 4.0026 },
    { position: 3, category: 'Lithium', date: new Date().getTime(), value: 6.941 },
    { position: 4, category: 'Beryllium', date: new Date().getTime(), value: 9.0122 },
    { position: 5, category: 'Boron', date: new Date().getTime(), value: 10.811 },
    { position: 6, category: 'Carbon', date: new Date().getTime(), value: 2.0107 },
    { position: 7, category: 'Nitrogen', date: new Date().getTime(), value: 4.0067 },
    { position: 8, category: 'Oxygen', date: new Date().getTime(), value: 5.9994 },
    { position: 9, category: 'Fluorine', date: new Date().getTime(), value: 8.9984 },
    { position: 10, category: 'Neon', date: new Date().getTime(), value: 0.1797 },
  ]

  public displayedColumns: string[] = ['position', 'category', 'date', 'value']
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
    this._sn.open(`Registro de "${name}" foi criado com sucesso.`, 'Ok', { duration: 3000 })
  }

}
