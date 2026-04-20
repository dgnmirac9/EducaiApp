using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

/// <summary>
/// Kullanıcının haftalık ve günlük soru hedefine göre ilerleme yüzdesini hesaplar.
/// </summary>
public interface IUserProgressService
{
    /// <summary>
    /// Bu haftaki çözülen soru sayısını <see cref="UserProgressDto"/> olarak döner.
    /// </summary>
    Task<UserProgressDto> GetWeeklyProgressAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Bugün çözülen soru sayısını <see cref="UserProgressDto"/> olarak döner.
    /// </summary>
    Task<UserProgressDto> GetDailyProgressAsync(Guid userId, CancellationToken cancellationToken = default);
}
