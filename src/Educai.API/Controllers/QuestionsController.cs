using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class QuestionsController(IQuestionService questionService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var questions = await questionService.GetAllQuestionsAsync(cancellationToken);
        return Ok(questions);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var question = await questionService.GetQuestionByIdAsync(id, cancellationToken);
        
        if (question is null)
            return NotFound(new { message = "Soru bulunamadı." });
            
        return Ok(question);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateQuestionDto dto, CancellationToken cancellationToken)
    {
        var createdQuestion = await questionService.CreateQuestionAsync(dto, cancellationToken);
        
        return CreatedAtAction(
            nameof(GetById), 
            new { id = createdQuestion.Id }, 
            createdQuestion);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, CreateQuestionDto dto, CancellationToken cancellationToken)
    {
        var updatedQuestion = await questionService.UpdateQuestionAsync(id, dto, cancellationToken);
        
        if (updatedQuestion is null)
            return NotFound(new { message = "Soru bulunamadı veya güncellenemedi." });
            
        return Ok(updatedQuestion);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await questionService.DeleteQuestionAsync(id, cancellationToken);
        
        if (!isDeleted)
            return NotFound(new { message = "Soru bulunamadı veya silinemedi." });
            
        return NoContent();
    }
}
