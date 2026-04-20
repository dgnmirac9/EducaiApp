using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UserActivityController(IUserActivityService activityService) : ControllerBase
{
    /// <summary>
    /// Kullanıcının çözdüğü soruyu loglar.
    /// </summary>
    /// <response code="201">Aktivite başarıyla kaydedildi.</response>
    /// <response code="404">Soru bulunamadı.</response>
    [HttpPost("log")]
    public async Task<IActionResult> Log(
        [FromBody] LogActivityRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var activity = await activityService.LogActivityAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetByUser), new { userId = activity.UserId }, activity);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Kullanıcının tüm aktivite geçmişini döner.
    /// </summary>
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetByUser(Guid userId, CancellationToken cancellationToken)
    {
        var activities = await activityService.GetUserActivitiesAsync(userId, cancellationToken);
        return Ok(activities);
    }

    /// <summary>
    /// Kullanıcının belirli bir güne ait ilerleme durumunu döner (DailyTarget dahil).
    /// </summary>
    /// <param name="date">ISO 8601 formatı: yyyy-MM-dd</param>
    [HttpGet("{userId:guid}/progress/daily")]
    public async Task<IActionResult> GetDailyProgress(
        Guid userId,
        [FromQuery] DateOnly date,
        CancellationToken cancellationToken)
    {
        var progress = await activityService.GetDailyProgressAsync(userId, date, cancellationToken);
        if (progress is null)
            return NotFound(new { message = "Kullanıcı tercihleri bulunamadı." });

        return Ok(progress);
    }

    /// <summary>
    /// Kullanıcının bulunulan haftaya ait ilerleme durumunu döner (WeeklyTarget dahil).
    /// </summary>
    [HttpGet("{userId:guid}/progress/weekly")]
    public async Task<IActionResult> GetWeeklyProgress(Guid userId, CancellationToken cancellationToken)
    {
        var progress = await activityService.GetWeeklyProgressAsync(userId, cancellationToken);
        if (progress is null)
            return NotFound(new { message = "Kullanıcı tercihleri bulunamadı." });

        return Ok(progress);
    }
}
