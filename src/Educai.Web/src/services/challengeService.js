import api from './api'

export async function getChallenges() {
  const { data } = await api.get('/api/Challenges')
  return data
}
