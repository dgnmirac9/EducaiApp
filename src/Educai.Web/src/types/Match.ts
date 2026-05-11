export interface Match {
  matchId: string
  opponentId: string
  challengeId: string
  myScore: number
  opponentScore: number
}

export interface ChallengeMatchDto {
  id: string
  challengeId: string
  player1Id: string
  player2Id: string
  winnerId: string | null
  matchStatus: number
  createdAt: string
}
