using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

/// <summary>Soru CRUD işlemlerinin varsayılan implementasyonu.</summary>
public sealed class QuestionService(EducaiDbContext dbContext) : IQuestionService
{
    public async Task<IEnumerable<QuestionDto>> GetAllQuestionsAsync(CancellationToken cancellationToken = default)
    {
        var questions = await dbContext.Questions
            .AsNoTracking()
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync(cancellationToken);

        return questions.Select(MapToDto);
    }

    public async Task<QuestionDto?> GetQuestionByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var question = await dbContext.Questions
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Id == id, cancellationToken);

        return question is null ? null : MapToDto(question);
    }

    public async Task<QuestionDto> CreateQuestionAsync(CreateQuestionDto dto, CancellationToken cancellationToken = default)
    {
        var question = new Question
        {
            Id = Guid.CreateVersion7(),
            Content = dto.Content,
            Category = dto.Category,
            DifficultyLevel = dto.DifficultyLevel,
            CorrectAnswer = dto.CorrectAnswer,
            WrongAnswer1 = dto.WrongAnswer1,
            WrongAnswer2 = dto.WrongAnswer2,
            WrongAnswer3 = dto.WrongAnswer3,
            CreatedAt = DateTime.UtcNow
        };

        dbContext.Questions.Add(question);
        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(question);
    }

    public async Task<QuestionDto?> UpdateQuestionAsync(Guid id, CreateQuestionDto dto, CancellationToken cancellationToken = default)
    {
        var question = await dbContext.Questions
            .FirstOrDefaultAsync(q => q.Id == id, cancellationToken);

        if (question is null)
            return null;

        question.Content = dto.Content;
        question.Category = dto.Category;
        question.DifficultyLevel = dto.DifficultyLevel;
        question.CorrectAnswer = dto.CorrectAnswer;
        question.WrongAnswer1 = dto.WrongAnswer1;
        question.WrongAnswer2 = dto.WrongAnswer2;
        question.WrongAnswer3 = dto.WrongAnswer3;

        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(question);
    }

    public async Task<bool> DeleteQuestionAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var question = await dbContext.Questions
            .FirstOrDefaultAsync(q => q.Id == id, cancellationToken);

        if (question is null)
            return false;

        dbContext.Questions.Remove(question);
        await dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    // ── Manuel Mapping ──────────────────────────────────────────────────

    private static QuestionDto MapToDto(Question entity) =>
        new(
            entity.Id,
            entity.Content,
            entity.Category,
            entity.DifficultyLevel,
            entity.CorrectAnswer,
            entity.WrongAnswer1,
            entity.WrongAnswer2,
            entity.WrongAnswer3,
            entity.CreatedAt);
}
