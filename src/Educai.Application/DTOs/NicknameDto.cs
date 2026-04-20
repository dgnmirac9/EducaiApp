namespace Educai.Application.DTOs;

/// <summary>
/// Nickname üretme isteği. Keywords boş bırakılırsa tamamen rastgele üretim yapılır.
/// </summary>
public record NicknameRequest(
    Guid UserId,
    IReadOnlyList<string> Keywords,
    int Count = 5);

/// <summary>
/// Üretilen nickname önerileri ve üretim zamanı.
/// </summary>
public record NicknameResponse(
    IReadOnlyList<string> Suggestions,
    DateTime GeneratedAt);
