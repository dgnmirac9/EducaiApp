using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

/// <summary>
/// AI destekli nickname üretici sözleşmesi.
/// Mock veya gerçek AI implementasyonu bu interface üzerinden değiştirilebilir.
/// </summary>
public interface IAINicknameService
{
    /// <summary>
    /// Verilen anahtar kelimelere dayalı nickname önerileri üretir.
    /// </summary>
    Task<NicknameResponse> GenerateNicknameAsync(NicknameRequest request, CancellationToken cancellationToken = default);
}
