namespace Educai.Application.DTOs;

public record ChallengeDto(
    Guid Id,
    string Title,
    string Description,
    decimal DifficultyWeight,
    DateTime StartDate,
    DateTime EndDate,
    bool IsActive);

public record CreateChallengeDto(
    string Title,
    string Description,
    decimal DifficultyWeight,
    DateTime StartDate,
    DateTime EndDate,
    bool IsActive);
