namespace Educai.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Nickname { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
        
    //oyunlaştırma & antigravity
    public int Level { get; set; } = 1;
    public long TotalXP { get; set; } = 0;
    public bool IsPremium { get; set; } = false;
    
    //antigravity katsayısı ve eşleşme
    public double AntigravityMultiplier { get; set; } = 1.0;
    public bool IsSearchingForMatch { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public UserPreference? Preference { get; set; }
}