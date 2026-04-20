using Educai.Application.DTOs;

namespace Educai.Application.Interfaces;

public interface IUserPreferenceService
{
    Task<IEnumerable<UserPreferenceDto>> GetAllPreferencesAsync(CancellationToken cancellationToken = default);
    Task<UserPreferenceDto?> GetPreferenceByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<UserPreferenceDto?> GetPreferenceByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<UserPreferenceDto> CreatePreferenceAsync(CreateUserPreferenceDto dto, CancellationToken cancellationToken = default);
    Task<UserPreferenceDto?> UpdatePreferenceAsync(Guid id, UpdateUserPreferenceDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeletePreferenceAsync(Guid id, CancellationToken cancellationToken = default);
}
