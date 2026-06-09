import api from './api'

export async function getUser(userId) {
  const { data } = await api.get(`/api/Users/${userId}`)
  return data
}
