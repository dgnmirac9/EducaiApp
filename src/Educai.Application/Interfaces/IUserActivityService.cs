using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

/// <summary>
/// Kullanıcı soru çözme aktivitelerinin loglanması ve istatistik sorgulamaları.
/// </summary>
public interface IUserActivityService
{
    /// <summary>
    /// Kullanıcının çözdüğü soruyu loglar. Soru kategorisi Question tablosundan otomatik alınır.
    /// </summary>
    Task<UserActivityDto> LogActivityAsync(LogActivityRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Kullanıcının tüm aktivite geçmişini en yeniden eskiye döner.
    /// </summary>
    Task<IEnumerable<UserActivityDto>> GetUserActivitiesAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Belirli bir günün ilerleme durumunu UserPreference.DailyTarget ile birlikte döner.
    /// </summary>
    Task<DailyProgressDto?> GetDailyProgressAsync(Guid userId, DateOnly date, CancellationToken cancellationToken = default);

    /// <summary>
    /// Bulunulan haftanın (Pazartesi–Pazar) ilerleme durumunu WeeklyQuestionTarget ile birlikte döner.
    /// </summary>
    Task<WeeklyProgressDto?> GetWeeklyProgressAsync(Guid userId, CancellationToken cancellationToken = default);
}
