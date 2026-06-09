import api from './api'

export async function getTopLeaderboard(count) {
  const { data } = await api.get(`/api/Matchmaking/leaderboard/top/${count}`)
  return data
}
