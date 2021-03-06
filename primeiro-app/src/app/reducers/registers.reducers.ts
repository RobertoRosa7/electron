import { createReducer, on } from "@ngrx/store";
import * as actions from '../actions/registers.actions'
import { Register } from "../models/models";

const categories: string[] = [
  'Banco',
  'Alimentação',
  'Vestuário',
  'Transporte',
  'Água & Luz',
  'Internet',
  'Pessoal',
  'Trabalho'
].sort()

const INITIAL_STATE = {
  all: [],
  tab: '',
  visible: {},
  consolidado: {},
  msg: '',
  total: 0,
  categories
}
const registersReducers = createReducer(
  INITIAL_STATE,
  on(actions.SET_REGISTERS, (states, { payload }) => ({ ...states, all: states.all.concat(payload) })),
  on(actions.GET_REGISTERS, (states, { payload }) => ({
    ...states,
    all: payload.data.results.map((s: Register) =>
      ({ ...s, status: statusTrans(s.status, s.type), cat_icon: returnIcon(s.category) })),
    consolidado: payload.data.consolidado,
    msg: payload.msg,
    total: payload.data.total
  })),
  on(actions.GET_TAB, (states, { payload }) => ({ ...states, tab: payload })),
  on(actions.SET_SHOWTAB, (states, { payload }) => ({ ...states, visible: payload })),
  on(actions.SET_UPDATE, (states, { payload }) => {
    const stateUpdated: any = [...states.all]
    stateUpdated[stateUpdated.findIndex((r: any) => r._id.$oid === payload._id.$oid)] = payload
    return { ...states, all: stateUpdated }
  }),
)

function returnIcon(text: string = ''): string {
  switch (cleanText(text)) {
    case 'alimentacao':
      return 'restaurant'
    case 'transporte':
      return 'train'
    case 'banco':
      return 'account_balance'
    case 'trabalho':
      return 'work_outline'
    case 'vestuario':
      return 'checkroom'
    case 'outros':
      return 'drag_indicator'
    case 'pessoal':
      return 'perm_identity'
    case 'internet':
      return 'swap_vert'
    case 'agua_e_luz':
      return 'payment'
    default:
      return 'drag_indicator'
  }
}

function statusTrans(text: string = '', type: string) {
  switch (text) {
    case 'pending':
      return type === 'incoming' ? 'pendente a receber' : 'pendente a pagar'
    case 'done':
      return 'concluído'
    default:
      return 'pendente'
  }
}

function cleanText(text: string | undefined = ''): string {
  return text.toLowerCase().replace(' ', '_').replace('&', 'e').replace('á', 'a').replace('ã', 'a')
    .replace('ç', 'c').replace('õ', 'o')
}

export function reducer(state: any, action: any) {
  return registersReducers(state, action)
}