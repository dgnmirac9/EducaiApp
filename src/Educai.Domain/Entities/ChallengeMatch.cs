using Educai.Domain.Enums;

namespace Educai.Domain.Entities;

public class ChallengeMatch
{
    public Guid Id { get; set; }
    public Guid ChallengeId { get; set; }
    
    public Guid Player1Id { get; set; }
    public Guid Player2Id { get; set; }
    
    public Guid? WinnerId { get; set; }
    
    public MatchStatus MatchStatus { get; set; } = MatchStatus.Pending;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation Properties
    public Challenge Challenge { get; set; } = null!;
    public User Player1 { get; set; } = null!;
    public User Player2 { get; set; } = null!;
}
