import { environment } from '../../environments/environment'

export class Constants {
  private readonly host: string

  constructor() {
    if (environment) {
      this.host = 'http://127.0.0.1:3000/'
    } else {
      this.host = 'http://127.0.0.1:3000/'
    }
  }

  public readonly paths: any = {
    fetch_is_online: '',
    fetch_consolidado: 'dashboard/calc_consolidado',
    fetch_registers: 'dashboard/fetch_registers',
    fetch_evolucao: 'dashboard/fetch_evolucao',
    fetch_evolucao_despesas: 'dashboard/fetch_evolucao_despesas',
    fetch_evolucao_detail: 'dashboard/fetch_evolucao_detail',
    fetch_search:'dashboard/search',
    new_register: 'dashboard/new_register',
    delete_register: 'dashboard/delete_register',
    update_register: 'dashboard/update_register',
    get_status_code: 'dashboard/get_status_code',
    get_list_autocomplete: 'dashboard/get_list_autocomplete',
    set_dev_mode: 'dashboard/set_dev_mode',

    signup: 'login/signup',
    signin: 'login/signin',
  }

  public get(key: string, host?: string): string {
    host = host ? host : this.host
    const path = host + this.paths[key]
    if (path === undefined) throw new Error("Couldnt find " + key + " in paths")
    return path
  }
}