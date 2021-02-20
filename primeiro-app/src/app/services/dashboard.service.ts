import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusCode } from 'aws-sdk/clients/apigateway';
import { Observable } from 'rxjs';
import { Consolidado, Register } from '../models/models';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private constants: Constants,
  ) { }

  public fetchRegisters(): Observable<Register[]> {
    return this.http.get<Register[]>(this.constants.get('fetch_registers'))
  }

  public newRegister(payload: Register): Observable<Register> {
    return this.http.post<Register>(this.constants.get('new_register'), payload)
  }

  public fetchConsolidado(): Observable<Consolidado> {
    return this.http.get<Consolidado>(this.constants.get('fetch_consolidado'))
  }

  public deleteRegister(payload: Register): Observable<Register> {
    return this.http.post<Register>(this.constants.get('delete_register'), payload)
  }
  
  public updateRegister(payload: Register): Observable<Register> {
    return this.http.post<Register>(this.constants.get('update_register'), payload)
  }

  public getStatusCode(): Observable<StatusCode[]> {
    return this.http.get<StatusCode[]>(this.constants.get('get_status_code'))
  }
}
