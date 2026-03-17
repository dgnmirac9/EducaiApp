using Microsoft.EntityFrameworkCore;
using Educai.Domain.Entities;
namespace Educai.Infrastructure.Data;

public class EducaiDbContext : DbContext
{
    public EducaiDbContext(DbContextOptions<EducaiDbContext> options) : base(options) { }
    
    public DbSet<User> Users => Set<User>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<UserPreference> UserPreferences => Set<UserPreference>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        //user ile UserPreference arasındaki 1-1 ilişkiyi tanımlayalım
        modelBuilder.Entity<User>()
            .HasOne(u => u.Preference)
            .WithOne(p => p.User)
            .HasForeignKey<UserPreference>(p => p.UserId);
    }
}