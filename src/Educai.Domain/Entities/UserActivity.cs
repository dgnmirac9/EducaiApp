namespace Educai.Domain.Entities;

public class UserActivity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public bool IsCorrect { get; set; }
    public DateTime SolvedAt { get; set; } = DateTime.UtcNow;

    // Kategori sorgularda join gerekmemesi için denormalize tutulur
    public string Category { get; set; } = string.Empty;

    public User User { get; set; } = null!;
    public Question Question { get; set; } = null!;
}
