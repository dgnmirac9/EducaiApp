namespace Educai.Application.DTOs;

/// <summary>
/// Kullanıcının belirli bir periyottaki soru çözme ilerlemesini yüzde olarak taşır.
/// </summary>
public record UserProgressDto(
    Guid UserId,
    /// <summary>"daily" veya "weekly"</summary>
    string Period,
    int Solved,
    int Target,
    double ProgressPercentage);
