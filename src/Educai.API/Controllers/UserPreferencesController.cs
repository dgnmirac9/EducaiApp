using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UserPreferencesController(IUserPreferenceService preferenceService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var prefs = await preferenceService.GetAllPreferencesAsync(cancellationToken);
        return Ok(prefs);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var pref = await preferenceService.GetPreferenceByIdAsync(id, cancellationToken);
        if (pref is null)
            return NotFound(new { message = "Tercih bulunamadı." });
            
        return Ok(pref);
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<IActionResult> GetByUserId(Guid userId, CancellationToken cancellationToken)
    {
        var pref = await preferenceService.GetPreferenceByUserIdAsync(userId, cancellationToken);
        if (pref is null)
            return NotFound(new { message = "Kullanıcıya ait tercih bulunamadı." });
            
        return Ok(pref);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserPreferenceDto dto, CancellationToken cancellationToken)
    {
        var createdPref = await preferenceService.CreatePreferenceAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = createdPref.Id }, createdPref);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateUserPreferenceDto dto, CancellationToken cancellationToken)
    {
        var updatedPref = await preferenceService.UpdatePreferenceAsync(id, dto, cancellationToken);
        if (updatedPref is null)
            return NotFound(new { message = "Tercih bulunamadı veya güncellenemedi." });
            
        return Ok(updatedPref);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await preferenceService.DeletePreferenceAsync(id, cancellationToken);
        if (!isDeleted)
            return NotFound(new { message = "Tercih bulunamadı veya silinemedi." });
            
        return NoContent();
    }
}
