using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

public sealed class UserActivityService(EducaiDbContext dbContext) : IUserActivityService
{
    public async Task<UserActivityDto> LogActivityAsync(
        LogActivityRequest request,
        CancellationToken cancellationToken = default)
    {
        // Soru kategori bilgisini denormalize olarak aktiviteye yazıyoruz
        var question = await dbContext.Questions
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Id == request.QuestionId, cancellationToken)
            ?? throw new InvalidOperationException($"Soru bulunamadı: {request.QuestionId}");

        var activity = new UserActivity
        {
            Id = Guid.CreateVersion7(),
            UserId = request.UserId,
            QuestionId = request.QuestionId,
            IsCorrect = request.IsCorrect,
            SolvedAt = DateTime.UtcNow,
            Category = question.Category
        };

        dbContext.UserActivities.Add(activity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(activity);
    }

    public async Task<IEnumerable<UserActivityDto>> GetUserActivitiesAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var activities = await dbContext.UserActivities
            .AsNoTracking()
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.SolvedAt)
            .ToListAsync(cancellationToken);

        return activities.Select(MapToDto);
    }

    public async Task<DailyProgressDto?> GetDailyProgressAsync(
        Guid userId,
        DateOnly date,
        CancellationToken cancellationToken = default)
    {
        var preference = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);

        if (preference is null)
            return null;

        var dayStart = date.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var dayEnd = dayStart.AddDays(1);

        var activities = await dbContext.UserActivities
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.SolvedAt >= dayStart && a.SolvedAt < dayEnd)
            .ToListAsync(cancellationToken);

        return new DailyProgressDto(
            userId,
            date,
            Solved: activities.Count,
            Correct: activities.Count(a => a.IsCorrect),
            DailyTarget: preference.DailyTarget);
    }

    public async Task<WeeklyProgressDto?> GetWeeklyProgressAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var preference = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);

        if (preference is null)
            return null;

        var today = DateTime.UtcNow.Date;

        // ISO 8601: hafta Pazartesi başlar
        var dayOfWeek = (int)today.DayOfWeek;
        var daysFromMonday = dayOfWeek == 0 ? 6 : dayOfWeek - 1;
        var weekStart = today.AddDays(-daysFromMonday);
        var weekEnd = weekStart.AddDays(7);

        var activities = await dbContext.UserActivities
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.SolvedAt >= weekStart && a.SolvedAt < weekEnd)
            .ToListAsync(cancellationToken);

        return new WeeklyProgressDto(
            userId,
            WeekStart: DateOnly.FromDateTime(weekStart),
            Solved: activities.Count,
            Correct: activities.Count(a => a.IsCorrect),
            WeeklyTarget: preference.WeeklyQuestionTarget);
    }

    private static UserActivityDto MapToDto(UserActivity entity) =>
        new(entity.Id, entity.UserId, entity.QuestionId,
            entity.IsCorrect, entity.SolvedAt, entity.Category);
}
