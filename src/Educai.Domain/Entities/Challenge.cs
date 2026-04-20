namespace Educai.Domain.Entities;

public class Challenge
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    // XP Çarpanı (örn: 1.5, 2.0)
    public decimal DifficultyWeight { get; set; } = 1.0m;
    
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; } = true;
}
