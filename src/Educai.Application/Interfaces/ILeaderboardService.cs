using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

public interface ILeaderboardService
{
    Task<IEnumerable<UserDto>> GetTopUsersAsync(int count, CancellationToken cancellationToken = default);
    Task<bool> CalculateChallengeRewardAsync(Guid matchId, CancellationToken cancellationToken = default);
}
