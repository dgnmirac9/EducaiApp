using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

/// <summary>
/// Düello maçları için XP hesaplama ve uygulama endpoint'leri.
/// </summary>
[ApiController]
[Route("api/xp")]
public sealed class XPController(IXPService xpService) : ControllerBase
{
    /// <summary>
    /// Maç için kazananın alacağı XP'yi hesaplar (veritabanını güncellemez).
    /// </summary>
    [HttpPost("calculate/{matchId:guid}")]
    public async Task<IActionResult> Calculate(Guid matchId, CancellationToken cancellationToken)
    {
        var result = await xpService.CalculateMatchXPAsync(matchId, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Hesaplanan XP'yi kazananın profiline uygular ve level'ı günceller.
    /// </summary>
    [HttpPost("apply/{matchId:guid}")]
    public async Task<IActionResult> Apply(Guid matchId, CancellationToken cancellationToken)
    {
        await xpService.ApplyXPToWinnerAsync(matchId, cancellationToken);
        return NoContent();
    }
}
