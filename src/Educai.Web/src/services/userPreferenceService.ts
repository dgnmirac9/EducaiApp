import api from './api'
import type {
  UserPreference,
  CreateUserPreferencePayload,
  UpdateUserPreferencePayload,
} from '../types/UserPreference'

export async function getUserPreference(userId: string): Promise<UserPreference | null> {
  try {
    const { data } = await api.get<UserPreference>(`/api/UserPreferences/user/${userId}`)
    return data
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status
    if (status === 404) return null
    throw err
  }
}

export async function createUserPreference(
  payload: CreateUserPreferencePayload,
): Promise<UserPreference> {
  const { data } = await api.post<UserPreference>('/api/UserPreferences', payload)
  return data
}

export async function updateUserPreference(
  preferenceId: string,
  payload: UpdateUserPreferencePayload,
): Promise<UserPreference> {
  const { data } = await api.put<UserPreference>(`/api/UserPreferences/${preferenceId}`, payload)
  return data
}
