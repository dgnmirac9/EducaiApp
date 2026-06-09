import api from './api'

export async function joinQueue(userId) {
  const { data } = await api.post(`/api/Matchmaking/join-queue/${userId}`)
  return data
}

export async function findMatch(userId) {
  const { data } = await api.post(`/api/Matchmaking/find-match/${userId}`)
  return data
}

export async function finishMatch(matchId) {
  const { data } = await api.post(`/api/Matchmaking/finish-match/${matchId}`)
  return data
}
