namespace Educai.Application.DTOs;

/// <summary>
/// Bir maç için hesaplanan XP ödülünü taşır.
/// </summary>
public record XPRewardDto(
    Guid MatchId,
    Guid WinnerId,
    /// <summary>Temel XP: 100 × DifficultyWeight</summary>
    decimal BaseXP,
    /// <summary>Uygulanan çarpan: AntigravityMultiplier</summary>
    double AntigravityMultiplier,
    /// <summary>Kazanana verilecek toplam XP</summary>
    long TotalXP);
