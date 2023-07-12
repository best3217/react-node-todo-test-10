export interface todoTypes {
  createdAt: string
  id: number
  note: string
  status: number
  type: number
  updatedAt: string
}

interface dataTypes {
  result: todoTypes[]
  status: string
  field?: string
}

export interface responseTypes {
  errorCode?: string
  errorMessage?: string
  statusCode?: number
  data?: dataTypes
}
