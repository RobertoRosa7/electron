import { environment } from '../../environments/environment'

export class Constants {
  private readonly host: string

  constructor() {
    if (environment) {
      this.host = 'http://localhost:5000/'
    } else {
      this.host = 'http://localhost:5000/'
    }
  }

  public readonly paths: any = {
    fetch_registers: 'dashboard/fetch_registers',
    fetch_consolidado: 'dashboard/calc_consolidado',
    new_register: 'dashboard/new_register',
    delete_register: 'dashboard/delete_register'
  }

  public get(key: string, host?: string): string {
    host = host ? host : this.host
    const path = host + this.paths[key]
    if (path === undefined) throw new Error("Couldnt find " + key + " in paths")
    return path
  }
}