using Educai.Application.DTOs;
using Educai.Domain.Entities;
using Educai.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ChallengesController(EducaiDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var challenges = await dbContext.Challenges
            .AsNoTracking()
            .ToListAsync(cancellationToken);
            
        var dtos = challenges.Select(c => new ChallengeDto(
            c.Id, c.Title, c.Description, c.DifficultyWeight, c.StartDate, c.EndDate, c.IsActive));
            
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateChallengeDto dto, CancellationToken cancellationToken)
    {
        var challenge = new Challenge
        {
            Id = Guid.CreateVersion7(),
            Title = dto.Title,
            Description = dto.Description,
            DifficultyWeight = dto.DifficultyWeight,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            IsActive = dto.IsActive
        };

        dbContext.Challenges.Add(challenge);
        await dbContext.SaveChangesAsync(cancellationToken);

        var resultDto = new ChallengeDto(
            challenge.Id, challenge.Title, challenge.Description, challenge.DifficultyWeight, 
            challenge.StartDate, challenge.EndDate, challenge.IsActive);

        return Ok(resultDto);
    }
}
