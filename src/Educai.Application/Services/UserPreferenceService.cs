using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

public sealed class UserPreferenceService(EducaiDbContext dbContext) : IUserPreferenceService
{
    public async Task<IEnumerable<UserPreferenceDto>> GetAllPreferencesAsync(CancellationToken cancellationToken = default)
    {
        var prefs = await dbContext.UserPreferences
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return prefs.Select(MapToDto);
    }

    public async Task<UserPreferenceDto?> GetPreferenceByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var pref = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        return pref is null ? null : MapToDto(pref);
    }
    
    public async Task<UserPreferenceDto?> GetPreferenceByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var pref = await dbContext.UserPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);

        return pref is null ? null : MapToDto(pref);
    }

    public async Task<UserPreferenceDto> CreatePreferenceAsync(CreateUserPreferenceDto dto, CancellationToken cancellationToken = default)
    {
        var pref = new UserPreference
        {
            Id = Guid.CreateVersion7(),
            UserId = dto.UserId,
            GoalSubject = dto.GoalSubject,
            DailyTarget = dto.DailyTarget,
            WeeklyQuestionTarget = dto.WeeklyQuestionTarget,
            FocusAreas = dto.FocusAreas
        };

        dbContext.UserPreferences.Add(pref);
        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(pref);
    }

    public async Task<UserPreferenceDto?> UpdatePreferenceAsync(Guid id, UpdateUserPreferenceDto dto, CancellationToken cancellationToken = default)
    {
        var pref = await dbContext.UserPreferences
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (pref is null)
            return null;

        pref.GoalSubject = dto.GoalSubject;
        pref.DailyTarget = dto.DailyTarget;
        pref.WeeklyQuestionTarget = dto.WeeklyQuestionTarget;
        pref.FocusAreas = dto.FocusAreas;

        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(pref);
    }

    public async Task<bool> DeletePreferenceAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var pref = await dbContext.UserPreferences
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (pref is null)
            return false;

        dbContext.UserPreferences.Remove(pref);
        await dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static UserPreferenceDto MapToDto(UserPreference entity) =>
        new(
            entity.Id,
            entity.UserId,
            entity.GoalSubject,
            entity.DailyTarget,
            entity.WeeklyQuestionTarget,
            entity.FocusAreas ?? new List<string>());
}
