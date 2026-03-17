namespace Educai.Domain.Entities;

public class UserPreference
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    
    //hedefler
    public string GoalSubject { get; set; } = "Genel";
    public int DailyTarget { get; set; } = 20;
    
    //navigation property
    public User User { get; set; } = null!;
}