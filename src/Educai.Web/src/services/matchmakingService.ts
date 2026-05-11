import api from './api'
import type { ChallengeMatchDto } from '../types/Match'

export async function joinQueue(userId: string): Promise<void> {
  await api.post(`/api/Matchmaking/join-queue/${userId}`)
}

export async function findMatch(userId: string): Promise<ChallengeMatchDto | null> {
  try {
    const { data } = await api.post<ChallengeMatchDto>(`/api/Matchmaking/find-match/${userId}`)
    return data
  } catch {
    return null
  }
}

export async function finishMatch(matchId: string): Promise<void> {
  await api.post(`/api/Matchmaking/finish-match/${matchId}`)
}
