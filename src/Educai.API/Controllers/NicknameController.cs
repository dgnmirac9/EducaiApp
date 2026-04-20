using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class NicknameController(
    IAINicknameService nicknameService,
    EducaiDbContext dbContext) : ControllerBase
{
    /// <summary>
    /// Premium kullanıcılar için anahtar kelime tabanlı AI nickname önerileri üretir.
    /// </summary>
    /// <response code="200">Nickname önerileri başarıyla üretildi.</response>
    /// <response code="403">Kullanıcı premium değil.</response>
    /// <response code="404">Kullanıcı bulunamadı.</response>
    [HttpPost("generate")]
    public async Task<IActionResult> Generate(
        [FromBody] NicknameRequest request,
        CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user is null)
            return NotFound(new { message = "Kullanıcı bulunamadı." });

        if (!user.IsPremium)
            return StatusCode(StatusCodes.Status403Forbidden,
                new { message = "Bu özellik yalnızca premium kullanıcılara açıktır." });

        var response = await nicknameService.GenerateNicknameAsync(request, cancellationToken);
        return Ok(response);
    }
}
