using Educai.Application.DTOs;
using Educai.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Educai.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var users = await userService.GetAllUsersAsync(cancellationToken);
        return Ok(users);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var user = await userService.GetUserByIdAsync(id, cancellationToken);
        if (user is null)
            return NotFound(new { message = "Kullanıcı bulunamadı." });
            
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserDto dto, CancellationToken cancellationToken)
    {
        var createdUser = await userService.CreateUserAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateUserDto dto, CancellationToken cancellationToken)
    {
        var updatedUser = await userService.UpdateUserAsync(id, dto, cancellationToken);
        if (updatedUser is null)
            return NotFound(new { message = "Kullanıcı bulunamadı veya güncellenemedi." });
            
        return Ok(updatedUser);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await userService.DeleteUserAsync(id, cancellationToken);
        if (!isDeleted)
            return NotFound(new { message = "Kullanıcı bulunamadı veya silinemedi." });
            
        return NoContent();
    }
}
