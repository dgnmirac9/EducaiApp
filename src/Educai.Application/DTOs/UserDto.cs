namespace Educai.Application.DTOs;

public record UserDto(
    Guid Id,
    string Nickname,
    int Level,
    long TotalXP,
    bool IsPremium,
    double AntigravityMultiplier,
    DateTime CreatedAt);

public record CreateUserDto(
    string Nickname,
    string PasswordHash, // Normalde şifre hashlenip saklanır (sadece mock demo için burada bırakılmıştır)
    bool IsPremium);

public record UpdateUserDto(
    string Nickname,
    int Level,
    long TotalXP,
    bool IsPremium);
