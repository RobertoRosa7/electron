export interface Register {
  position?: number
  category?: string
  created_at: number
  updated_at?: number
  value: number
  type: string
  status: string
  description?: string
  operation?: string
  brand?: string
  edit?: boolean
  user?: User
  _id?: any,
  month?: number,
  lista?: Register[]
}

export interface User {
  name: string
  email: string
  created_at: number
  updated_at?: number
  edit?: boolean
  registers?: Register[]
  photo_url?: string
  credit_card?: CreditCard
}

export interface Login {
  password: string
  email: string
  phone_number?: number
}

export interface CreditCard {
  brand: string
}

export interface Consolidado {
  total_credit: number
  total_debit: number
  total_consolidado: number
}

export interface StatusCode {
  status: number
  text: string
}