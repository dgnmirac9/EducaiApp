using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

/// <summary>
/// Düello sonuçlarına göre XP hesaplama ve uygulama işlemlerini sağlar.
/// </summary>
public interface IXPService
{
    /// <summary>
    /// Verilen maç için kazananın alacağı XP miktarını hesaplar; veritabanını güncellemez.
    /// </summary>
    Task<XPRewardDto> CalculateMatchXPAsync(Guid matchId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Hesaplanan XP'yi kazananın <c>TotalXP</c> ve <c>Level</c> alanına uygular.
    /// </summary>
    Task ApplyXPToWinnerAsync(Guid matchId, CancellationToken cancellationToken = default);
}
