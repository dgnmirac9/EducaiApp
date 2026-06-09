import api from './api'

export async function getPreferences(userId) {
  const { data } = await api.get(`/api/UserPreferences/user/${userId}`)
  return data
}

export async function updatePreferences(userId, payload) {
  const { data } = await api.put(`/api/UserPreferences/${userId}`, payload)
  return data
}
