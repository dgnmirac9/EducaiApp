import api from './api'
import type { User } from '../types/User'

export async function getTopLeaderboard(count: number): Promise<User[]> {
  const { data } = await api.get<User[]>(`/api/Matchmaking/leaderboard/top/${count}`)
  return data
}
