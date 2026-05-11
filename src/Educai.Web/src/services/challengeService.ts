import api from './api'
import type { Challenge } from '../types/Challenge'

export async function getActiveChallenges(): Promise<Challenge[]> {
  const { data } = await api.get<Challenge[]>('/api/Challenges')
  return data.filter((c) => c.isActive)
}
