using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

/// <summary>
/// Kullanıcının günlük ve haftalık soru hedefine göre ilerleme yüzdesini hesaplar.
/// </summary>
public sealed class UserProgressService(EducaiDbContext dbContext) : IUserProgressService
{
    /// <inheritdoc/>
    public async Task<UserProgressDto> GetWeeklyProgressAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var preference = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken)
            ?? throw new InvalidOperationException($"Kullanıcı tercihi bulunamadı: {userId}");

        var today = DateTime.UtcNow.Date;

        // ISO 8601: hafta Pazartesi başlar
        var daysFromMonday = (int)today.DayOfWeek == 0 ? 6 : (int)today.DayOfWeek - 1;
        var weekStart = today.AddDays(-daysFromMonday);
        var weekEnd = weekStart.AddDays(7);

        var solved = await dbContext.UserActivities
            .AsNoTracking()
            .CountAsync(a => a.UserId == userId && a.SolvedAt >= weekStart && a.SolvedAt < weekEnd, cancellationToken);

        var target = preference.WeeklyQuestionTarget;
        var percentage = target == 0 ? 0d : Math.Min(100d, solved / (double)target * 100d);

        return new UserProgressDto(userId, "weekly", solved, target, Math.Round(percentage, 2));
    }

    /// <inheritdoc/>
    public async Task<UserProgressDto> GetDailyProgressAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var preference = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken)
            ?? throw new InvalidOperationException($"Kullanıcı tercihi bulunamadı: {userId}");

        var dayStart = DateTime.UtcNow.Date;
        var dayEnd = dayStart.AddDays(1);

        var solved = await dbContext.UserActivities
            .AsNoTracking()
            .CountAsync(a => a.UserId == userId && a.SolvedAt >= dayStart && a.SolvedAt < dayEnd, cancellationToken);

        var target = preference.DailyTarget;
        var percentage = target == 0 ? 0d : Math.Min(100d, solved / (double)target * 100d);

        return new UserProgressDto(userId, "daily", solved, target, Math.Round(percentage, 2));
    }
}
