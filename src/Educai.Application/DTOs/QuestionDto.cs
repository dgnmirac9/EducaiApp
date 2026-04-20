namespace Educai.Application.DTOs;

/// <summary>Soru okuma / listeleme DTO'su.</summary>
public record QuestionDto(
    Guid Id,
    string Content,
    string Category,
    int DifficultyLevel,
    string CorrectAnswer,
    string WrongAnswer1,
    string WrongAnswer2,
    string WrongAnswer3,
    DateTime CreatedAt);

/// <summary>Yeni soru oluşturma isteği – Id ve CreatedAt sunucu tarafında atanır.</summary>
public record CreateQuestionDto(
    string Content,
    string Category,
    int DifficultyLevel,
    string CorrectAnswer,
    string WrongAnswer1,
    string WrongAnswer2,
    string WrongAnswer3);
