import api from './api'

export async function generateNickname(userId, keywords) {
  const { data } = await api.post('/api/Nickname/generate', {
    userId,
    keywords,
  })
  return data
}
