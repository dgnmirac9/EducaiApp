using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Enums;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

/// <summary>
/// Düello sonuçlarına göre XP hesaplar ve kazanana uygular.
/// </summary>
public sealed class XPService(EducaiDbContext dbContext) : IXPService
{
    private const int BaseXPPerMatch = 100;
    private const int XPPerLevel = 1000;

    /// <inheritdoc/>
    public async Task<XPRewardDto> CalculateMatchXPAsync(
        Guid matchId,
        CancellationToken cancellationToken = default)
    {
        var match = await dbContext.ChallengeMatches
            .AsNoTracking()
            .Include(m => m.Challenge)
            .FirstOrDefaultAsync(m => m.Id == matchId, cancellationToken)
            ?? throw new InvalidOperationException($"Maç bulunamadı: {matchId}");

        if (match.MatchStatus != MatchStatus.Completed || match.WinnerId is null)
            throw new InvalidOperationException($"Maç tamamlanmamış veya kazanan yok: {matchId}");

        var winner = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == match.WinnerId, cancellationToken)
            ?? throw new InvalidOperationException($"Kazanan kullanıcı bulunamadı: {match.WinnerId}");

        var baseXP = BaseXPPerMatch * match.Challenge.DifficultyWeight;
        var totalXP = (long)Math.Round(baseXP * (decimal)winner.AntigravityMultiplier);

        return new XPRewardDto(
            matchId,
            winner.Id,
            baseXP,
            winner.AntigravityMultiplier,
            totalXP);
    }

    /// <inheritdoc/>
    public async Task ApplyXPToWinnerAsync(
        Guid matchId,
        CancellationToken cancellationToken = default)
    {
        var match = await dbContext.ChallengeMatches
            .AsNoTracking()
            .Include(m => m.Challenge)
            .FirstOrDefaultAsync(m => m.Id == matchId, cancellationToken)
            ?? throw new InvalidOperationException($"Maç bulunamadı: {matchId}");

        if (match.MatchStatus != MatchStatus.Completed || match.WinnerId is null)
            throw new InvalidOperationException($"Maç tamamlanmamış veya kazanan yok: {matchId}");

        var winner = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == match.WinnerId, cancellationToken)
            ?? throw new InvalidOperationException($"Kazanan kullanıcı bulunamadı: {match.WinnerId}");

        var baseXP = BaseXPPerMatch * match.Challenge.DifficultyWeight;
        var earned = (long)Math.Round(baseXP * (decimal)winner.AntigravityMultiplier);

        winner.TotalXP += earned;
        winner.Level = (int)(winner.TotalXP / XPPerLevel) + 1;

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
