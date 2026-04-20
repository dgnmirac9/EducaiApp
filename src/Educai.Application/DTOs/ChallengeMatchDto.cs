using Educai.Domain.Enums;

namespace Educai.Application.DTOs;

public record ChallengeMatchDto(
    Guid Id,
    Guid ChallengeId,
    Guid Player1Id,
    Guid Player2Id,
    Guid? WinnerId,
    MatchStatus MatchStatus,
    DateTime CreatedAt);
