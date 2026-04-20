using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

public interface IMatchmakingService
{
    Task<ChallengeMatchDto?> FindMatchAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<bool> JoinQueueAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<bool> LeaveQueueAsync(Guid userId, CancellationToken cancellationToken = default);
}
