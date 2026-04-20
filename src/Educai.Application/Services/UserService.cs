using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Educai.Domain.Entities;
using Educai.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Educai.Application.Services;

public sealed class UserService(EducaiDbContext dbContext) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllUsersAsync(CancellationToken cancellationToken = default)
    {
        var users = await dbContext.Users
            .AsNoTracking()
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync(cancellationToken);

        return users.Select(MapToDto);
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        return user is null ? null : MapToDto(user);
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto, CancellationToken cancellationToken = default)
    {
        var user = new User
        {
            Id = Guid.CreateVersion7(),
            Nickname = dto.Nickname,
            PasswordHash = dto.PasswordHash,
            IsPremium = dto.IsPremium,
            Level = 1,
            TotalXP = 0,
            AntigravityMultiplier = 1.0,
            CreatedAt = DateTime.UtcNow
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(user);
    }

    public async Task<UserDto?> UpdateUserAsync(Guid id, UpdateUserDto dto, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (user is null)
            return null;

        user.Nickname = dto.Nickname;
        user.Level = dto.Level;
        user.TotalXP = dto.TotalXP;
        user.IsPremium = dto.IsPremium;

        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(user);
    }

    public async Task<bool> DeleteUserAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (user is null)
            return false;

        dbContext.Users.Remove(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static UserDto MapToDto(User entity) =>
        new(
            entity.Id,
            entity.Nickname,
            entity.Level,
            entity.TotalXP,
            entity.IsPremium,
            entity.AntigravityMultiplier,
            entity.CreatedAt);
}
