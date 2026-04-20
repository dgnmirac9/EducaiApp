using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

/// <summary>
/// Kullanıcının günlük ve haftalık ilerleme yüzdesini döner.
/// </summary>
[ApiController]
[Route("api/userprogress")]
public sealed class UserProgressController(IUserProgressService progressService) : ControllerBase
{
    /// <summary>
    /// Bu haftaki ilerleme yüzdesini döner.
    /// </summary>
    [HttpGet("{userId:guid}/weekly")]
    public async Task<IActionResult> GetWeekly(Guid userId, CancellationToken cancellationToken)
    {
        var result = await progressService.GetWeeklyProgressAsync(userId, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Bugünkü ilerleme yüzdesini döner.
    /// </summary>
    [HttpGet("{userId:guid}/daily")]
    public async Task<IActionResult> GetDaily(Guid userId, CancellationToken cancellationToken)
    {
        var result = await progressService.GetDailyProgressAsync(userId, cancellationToken);
        return Ok(result);
    }
}
