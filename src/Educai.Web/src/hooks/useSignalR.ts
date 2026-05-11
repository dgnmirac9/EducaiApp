import { useEffect, useState, useCallback } from 'react'
import { HubConnectionState } from '@microsoft/signalr'
import { signalRService } from '../services/signalRService'

interface UseSignalROptions {
  onOpponentScore?: (userId: string, earnedXP: number) => void
}

export function useSignalR(options?: UseSignalROptions) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    signalRService.connect()
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false))

    return () => {
      if (signalRService.state === HubConnectionState.Connecting) return
      if (signalRService.state === HubConnectionState.Connected) {
        signalRService.disconnect()
          .then(() => setIsConnected(false))
      }
    }
  }, [])

  useEffect(() => {
    if (!options?.onOpponentScore) return
    const cleanup = signalRService.onOpponentScore(options.onOpponentScore)
    return cleanup
  }, [options?.onOpponentScore])

  const joinMatch = useCallback((matchId: string) => signalRService.joinMatch(matchId), [])
  const leaveMatch = useCallback((matchId: string) => signalRService.leaveMatch(matchId), [])
  const sendScore = useCallback(
    (matchId: string, userId: string, earnedXP: number) =>
      signalRService.sendScore(matchId, userId, earnedXP),
    []
  )

  return { isConnected, joinMatch, leaveMatch, sendScore }
}
