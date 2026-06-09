import api from './api'

export async function getPreferences(userId) {
  const { data } = await api.get(`/api/UserPreferences/user/${userId}`)
  return data
}

export async function updatePreferences(prefId, payload) {
  const { data } = await api.put(`/api/UserPreferences/${prefId}`, payload)
  return data
}
