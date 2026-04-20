using Microsoft.AspNetCore.SignalR;

namespace Educai.API.Hubs;

public sealed class ChallengeHub : Hub
{
    public async Task JoinMatchGroup(string matchId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, matchId);
    }

    public async Task SendAnswerScore(string matchId, Guid userId, int earnedXP)
    {
        // Gruptaki diğer katılımcıya skoru anlık iletiyoruz
        await Clients.OthersInGroup(matchId).SendAsync("ReceiveOpponentScore", userId, earnedXP);
    }

    public async Task LeaveMatchGroup(string matchId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, matchId);
    }
}
