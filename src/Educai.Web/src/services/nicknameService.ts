import api from './api'

export interface NicknameResponse {
  suggestions: string[]
  generatedAt: string
}

export async function generateNickname(
  userId: string,
  keywords: string[],
  count = 3,
): Promise<NicknameResponse> {
  const { data } = await api.post<NicknameResponse>('/api/Nickname/generate', {
    userId,
    keywords,
    count,
  })
  return data
}
