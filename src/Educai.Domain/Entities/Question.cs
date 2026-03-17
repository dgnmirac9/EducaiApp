namespace Educai.Domain.Entities;

public class Question
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty; //soru metni
    public string Category { get; set; } = string.Empty; //matematik, fizik..
    public int DifficultyLevel { get; set; } //1 kolay, 5 zor
    
    //cevap seçenekleri
    public string CorrectAnswer { get; set; } = string.Empty;
    public string WrongAnswer1 { get; set; } = string.Empty;
    public string WrongAnswer2 { get; set; } = string.Empty;
    public string WrongAnswer3 { get; set; } =  string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}