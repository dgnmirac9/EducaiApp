export interface User {
  id: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
