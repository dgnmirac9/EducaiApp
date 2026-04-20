using Educai.Application.DTOs;
using Educai.Application.Interfaces;

namespace Educai.Application.Services;

/// <summary>
/// IAINicknameService mock implementasyonu.
/// Gerçek AI entegrasyonunda bu sınıf yerine yeni bir implementasyon
/// yazılıp DI kaydı değiştirilerek geçiş sağlanır.
/// </summary>
public sealed class MockAINicknameService : IAINicknameService
{
    private static readonly string[] Adjectives =
    [
        "Dark", "Bright", "Shadow", "Cosmic", "Swift", "Silent", "Brave",
        "Neon", "Frozen", "Storm", "Ancient", "Blazing", "Stealth", "Wild"
    ];

    private static readonly string[] Suffixes =
    [
        "Pro", "Master", "Hero", "King", "X", "Z", "Prime", "Elite",
        "Alpha", "Nova", "Striker", "Phantom", "Titan", "Ace"
    ];

    private static readonly string[] Connectors = ["", "_", "-"];

    /// <summary>
    /// Anahtar kelime + rastgele bileşen kombinasyonuyla <paramref name="request"/>.Count
    /// adet benzersiz nickname önerisi üretir.
    /// </summary>
    public Task<NicknameResponse> GenerateNicknameAsync(
        NicknameRequest request,
        CancellationToken cancellationToken = default)
    {
        var count = Math.Clamp(request.Count, 1, 10);
        var suggestions = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var rng = Random.Shared;

        // Keywords normalizasyonu: boşluk temizle, ilk harf büyük
        var bases = request.Keywords
            .Where(k => !string.IsNullOrWhiteSpace(k))
            .Select(k => Capitalize(k.Trim()))
            .ToList();

        // Yeterli keyword yoksa adjective havuzunu taban olarak kullan
        if (bases.Count == 0)
            bases = [.. Adjectives];

        var attempts = 0;
        while (suggestions.Count < count && attempts < count * 20)
        {
            attempts++;
            cancellationToken.ThrowIfCancellationRequested();

            var baseWord = bases[rng.Next(bases.Count)];
            var suffix = Suffixes[rng.Next(Suffixes.Length)];
            var connector = Connectors[rng.Next(Connectors.Length)];
            var number = rng.Next(0, 3) == 0 ? rng.Next(10, 9999).ToString() : string.Empty;

            // Kombinasyon stratejisi: Base + Connector + Suffix + Number
            var candidate = $"{baseWord}{connector}{suffix}{number}";
            suggestions.Add(candidate);
        }

        var response = new NicknameResponse(
            [.. suggestions],
            DateTime.UtcNow);

        return Task.FromResult(response);
    }

    private static string Capitalize(string value) =>
        value.Length == 0 ? value : char.ToUpperInvariant(value[0]) + value[1..].ToLowerInvariant();
}
