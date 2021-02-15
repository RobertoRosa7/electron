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