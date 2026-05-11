import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
  HttpTransportType,
} from '@microsoft/signalr'

class SignalRService {
  private connection: HubConnection
  private connectingPromise: Promise<void> | null = null

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5150/challenge-hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build()
  }

  get state(): HubConnectionState {
    return this.connection.state
  }

  get isConnected(): boolean {
    return this.connection.state === HubConnectionState.Connected
  }

  async connect(): Promise<void> {
    if (this.connection.state !== HubConnectionState.Disconnected) return
    this.connectingPromise = this.connection.start()
    try {
      await this.connectingPromise
    } finally {
      this.connectingPromise = null
    }
  }

  async disconnect(): Promise<void> {
    // Bağlantı hâlâ kuruluyorsa tamamlanmasını bekle, sonra durdur
    if (this.connectingPromise) {
      await this.connectingPromise.catch(() => {})
    }
    if (this.connection.state === HubConnectionState.Disconnected) return
    await this.connection.stop()
  }

  async joinMatch(matchId: string): Promise<void> {
    await this.connection.invoke('JoinMatchGroup', matchId)
  }

  async leaveMatch(matchId: string): Promise<void> {
    await this.connection.invoke('LeaveMatchGroup', matchId)
  }

  async sendScore(matchId: string, userId: string, earnedXP: number): Promise<void> {
    await this.connection.invoke('SendAnswerScore', matchId, userId, earnedXP)
  }

  onOpponentScore(callback: (userId: string, earnedXP: number) => void): () => void {
    this.connection.on('ReceiveOpponentScore', callback)
    return () => this.connection.off('ReceiveOpponentScore', callback)
  }
}

export const signalRService = new SignalRService()
