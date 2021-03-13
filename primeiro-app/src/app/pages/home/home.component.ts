import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogsComponent } from "src/app/components/dialogs/dialogs.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private _dialog: MatDialog,
    private _router: Router
  ) {

  }

  public ngOnInit(): void {
  }

  public login(): void {
    this._dialog.open(DialogsComponent, { data: { type: 'login', data: {} }, panelClass: 'dialog-default' })
      .afterClosed().subscribe(res => {
        if (res === 'login') {
          this._router.navigateByUrl('/dashboard')
        }
      })
  }

}