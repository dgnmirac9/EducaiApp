using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class MatchmakingController(
    IMatchmakingService matchmakingService,
    ILeaderboardService leaderboardService) : ControllerBase
{
    [HttpPost("join-queue/{userId:guid}")]
    public async Task<IActionResult> JoinQueue(Guid userId, CancellationToken cancellationToken)
    {
        var result = await matchmakingService.JoinQueueAsync(userId, cancellationToken);
        if (!result)
            return NotFound(new { message = "Kullanıcı bulunamadı." });
            
        return Ok(new { message = "Eşleştirme sırasına giriş yapıldı." });
    }

    [HttpPost("leave-queue/{userId:guid}")]
    public async Task<IActionResult> LeaveQueue(Guid userId, CancellationToken cancellationToken)
    {
        var result = await matchmakingService.LeaveQueueAsync(userId, cancellationToken);
        if (!result)
            return NotFound(new { message = "Kullanıcı bulunamadı." });
            
        return Ok(new { message = "Eşleştirme sırasından çıkıldı." });
    }

    [HttpPost("find-match/{userId:guid}")]
    public async Task<IActionResult> FindMatch(Guid userId, CancellationToken cancellationToken)
    {
        var match = await matchmakingService.FindMatchAsync(userId, cancellationToken);
        if (match is null)
            return NotFound(new { message = "Uygun eşleşme bulunamadı veya kullanıcı arama durumunda değil." });
            
        return Ok(match);
    }

    [HttpPost("finish-match/{matchId:guid}")]
    public async Task<IActionResult> FinishMatch(Guid matchId, CancellationToken cancellationToken)
    {
        var result = await leaderboardService.CalculateChallengeRewardAsync(matchId, cancellationToken);
        if (!result)
            return BadRequest(new { message = "Maç bulunamadı, henüz tamamlanmadı veya zaten işlendi." });
            
        return Ok(new { message = "Maç başarıyla tamamlandı ve XP güncellendi." });
    }
    
    [HttpGet("leaderboard/top/{count:int}")]
    public async Task<IActionResult> GetLeaderboard(int count, CancellationToken cancellationToken)
    {
        if (count <= 0 || count > 100) count = 10;
        var topUsers = await leaderboardService.GetTopUsersAsync(count, cancellationToken);
        return Ok(topUsers);
    }
}
