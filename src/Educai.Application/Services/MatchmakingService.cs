using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Domain.Enums;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

public sealed class MatchmakingService(EducaiDbContext dbContext) : IMatchmakingService
{
    public async Task<bool> JoinQueueAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null) return false;

        user.IsSearchingForMatch = true;
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> LeaveQueueAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null) return false;

        user.IsSearchingForMatch = false;
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<ChallengeMatchDto?> FindMatchAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var currentUser = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        if (currentUser is null || !currentUser.IsSearchingForMatch)
            return null; // Kullanıcı yok veya arama yapmıyor

        // Uygun rakip bul (+/- 2 level toleransı), kendisi hariç
        var opponent = await dbContext.Users
            .Where(u => u.IsSearchingForMatch && 
                        u.Id != currentUser.Id &&
                        u.Level >= currentUser.Level - 2 && 
                        u.Level <= currentUser.Level + 2)
            .OrderBy(u => Guid.NewGuid()) // Geçici rastgeleleştirme (gerçekte daha iyi bir mantık kurulabilir)
            .FirstOrDefaultAsync(cancellationToken);

        if (opponent is null)
            return null; // Rakip bulunamadı

        // Rastgele aktif bir Challenge seç
        var activeChallenge = await dbContext.Challenges
            .Where(c => c.IsActive && c.StartDate <= DateTime.UtcNow && c.EndDate >= DateTime.UtcNow)
            .OrderBy(c => Guid.NewGuid())
            .FirstOrDefaultAsync(cancellationToken);

        if (activeChallenge is null)
            return null; // Aktif challenge yok

        // Eşleşme oluştur
        var match = new ChallengeMatch
        {
            Id = Guid.CreateVersion7(),
            ChallengeId = activeChallenge.Id,
            Player1Id = currentUser.Id,
            Player2Id = opponent.Id,
            MatchStatus = MatchStatus.Active,
            CreatedAt = DateTime.UtcNow
        };

        dbContext.ChallengeMatches.Add(match);

        // İki kullanıcıyı da sıradan çıkar
        currentUser.IsSearchingForMatch = false;
        opponent.IsSearchingForMatch = false;

        await dbContext.SaveChangesAsync(cancellationToken);

        return new ChallengeMatchDto(
            match.Id,
            match.ChallengeId,
            match.Player1Id,
            match.Player2Id,
            match.WinnerId,
            match.MatchStatus,
            match.CreatedAt);
    }
}
