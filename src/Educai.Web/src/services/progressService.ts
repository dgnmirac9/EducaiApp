import api from './api'
import type { UserProgress } from '../types/UserProgress'

export async function getWeeklyProgress(userId: string): Promise<UserProgress> {
  const { data } = await api.get<UserProgress>(`/api/userprogress/${userId}/weekly`)
  return data
}
