import api from './api'
import type { User } from '../types/User'

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { data } = await api.get<User>(`/api/Users/${userId}`)
    return data
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status
    if (status === 404) return null
    throw err
  }
}

export interface UpdateUserPayload {
  nickname: string
  level: number
  totalXP: number
  isPremium: boolean
}

export async function updateUser(
  userId: string,
  payload: UpdateUserPayload,
): Promise<User> {
  const { data } = await api.put<User>(`/api/Users/${userId}`, payload)
  return data
}
