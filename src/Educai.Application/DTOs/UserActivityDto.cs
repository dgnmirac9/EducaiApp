namespace Educai.Application.DTOs;

/// <summary>
/// Tek aktivite kaydını temsil eder.
/// </summary>
public record UserActivityDto(
    Guid Id,
    Guid UserId,
    Guid QuestionId,
    bool IsCorrect,
    DateTime SolvedAt,
    string Category);

/// <summary>
/// Yeni aktivite loglama isteği.
/// </summary>
public record LogActivityRequest(
    Guid UserId,
    Guid QuestionId,
    bool IsCorrect);

/// <summary>
/// Günlük ilerleme durumu; DailyTarget ile karşılaştırma için kullanılır.
/// </summary>
public record DailyProgressDto(
    Guid UserId,
    DateOnly Date,
    int Solved,
    int Correct,
    int DailyTarget);

/// <summary>
/// Haftalık ilerleme durumu; WeeklyQuestionTarget ile karşılaştırma için kullanılır.
/// </summary>
public record WeeklyProgressDto(
    Guid UserId,
    DateOnly WeekStart,
    int Solved,
    int Correct,
    int WeeklyTarget);
