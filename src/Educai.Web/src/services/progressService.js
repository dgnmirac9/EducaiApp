import api from './api'

export async function getWeeklyProgress(userId) {
  const { data } = await api.get(`/api/userprogress/${userId}/weekly`)
  return data
}

export async function getDailyProgress(userId) {
  const { data } = await api.get(`/api/userprogress/${userId}/daily`)
  return data
}
