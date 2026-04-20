using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

/// <summary>Soru (Question) CRUD işlemleri için servis sözleşmesi.</summary>
public interface IQuestionService
{
    Task<IEnumerable<QuestionDto>> GetAllQuestionsAsync(CancellationToken cancellationToken = default);
    Task<QuestionDto?> GetQuestionByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<QuestionDto> CreateQuestionAsync(CreateQuestionDto dto, CancellationToken cancellationToken = default);
    Task<QuestionDto?> UpdateQuestionAsync(Guid id, CreateQuestionDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteQuestionAsync(Guid id, CancellationToken cancellationToken = default);
}
