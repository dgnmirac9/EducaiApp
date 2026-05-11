export interface UserPreference {
  id: string
  userId: string
  goalSubject: string
  dailyTarget: number
  weeklyQuestionTarget: number
  focusAreas: string[]
}

export interface CreateUserPreferencePayload {
  userId: string
  goalSubject: string
  dailyTarget: number
  weeklyQuestionTarget: number
  focusAreas: string[]
}

export interface UpdateUserPreferencePayload {
  goalSubject: string
  dailyTarget: number
  weeklyQuestionTarget: number
  focusAreas: string[]
}
