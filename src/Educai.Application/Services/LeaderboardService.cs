using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Domain.Enums;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

public sealed class LeaderboardService(EducaiDbContext dbContext) : ILeaderboardService
{
    private const long BaseChallengeXP = 100;

    public async Task<IEnumerable<UserDto>> GetTopUsersAsync(int count, CancellationToken cancellationToken = default)
    {
        var topUsers = await dbContext.Users
            .AsNoTracking()
            .OrderByDescending(u => u.TotalXP)
            .Take(count)
            .ToListAsync(cancellationToken);

        return topUsers.Select(MapToDto);
    }

    public async Task<bool> CalculateChallengeRewardAsync(Guid matchId, CancellationToken cancellationToken = default)
    {
        var match = await dbContext.ChallengeMatches
            .Include(m => m.Challenge)
            .FirstOrDefaultAsync(m => m.Id == matchId, cancellationToken);

        if (match is null || match.MatchStatus == MatchStatus.Completed || match.WinnerId is null)
            return false;

        var winner = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == match.WinnerId, cancellationToken);

        if (winner is null)
            return false;

        // Calculate XP
        long earnedXp = (long)(BaseChallengeXP * match.Challenge.DifficultyWeight);
        winner.TotalXP += earnedXp;
        
        // Match statüsünü güncelle
        match.MatchStatus = MatchStatus.Completed;

        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static UserDto MapToDto(User entity) =>
        new(
            entity.Id,
            entity.Nickname,
            entity.Level,
            entity.TotalXP,
            entity.IsPremium,
            entity.AntigravityMultiplier,
            entity.CreatedAt);
}
