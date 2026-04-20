namespace Educai.Application.DTOs;

public record UserPreferenceDto(
    Guid Id,
    Guid UserId,
    string GoalSubject,
    int DailyTarget,
    int WeeklyQuestionTarget,
    List<string> FocusAreas);

public record CreateUserPreferenceDto(
    Guid UserId,
    string GoalSubject,
    int DailyTarget,
    int WeeklyQuestionTarget,
    List<string> FocusAreas);

public record UpdateUserPreferenceDto(
    string GoalSubject,
    int DailyTarget,
    int WeeklyQuestionTarget,
    List<string> FocusAreas);
