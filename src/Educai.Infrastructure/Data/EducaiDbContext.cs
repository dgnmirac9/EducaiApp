using Microsoft.EntityFrameworkCore;
using Educai.Domain.Entities;
namespace Educai.Infrastructure.Data;

public class EducaiDbContext : DbContext
{
    public EducaiDbContext(DbContextOptions<EducaiDbContext> options) : base(options) { }
    
    public DbSet<User> Users => Set<User>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<UserPreference> UserPreferences => Set<UserPreference>();
    public DbSet<Challenge> Challenges => Set<Challenge>();
    public DbSet<ChallengeMatch> ChallengeMatches => Set<ChallengeMatch>();
    public DbSet<UserActivity> UserActivities => Set<UserActivity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        //user ile UserPreference arasındaki 1-1 ilişkiyi tanımlayalım
        modelBuilder.Entity<User>()
            .HasOne(u => u.Preference)
            .WithOne(p => p.User)
            .HasForeignKey<UserPreference>(p => p.UserId);

        // ChallengeMatch ilişkileri (cascade delete iptali)
        modelBuilder.Entity<ChallengeMatch>()
            .HasOne(m => m.Player1)
            .WithMany()
            .HasForeignKey(m => m.Player1Id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ChallengeMatch>()
            .HasOne(m => m.Player2)
            .WithMany()
            .HasForeignKey(m => m.Player2Id)
            .OnDelete(DeleteBehavior.Restrict);

        // UserActivity ilişkileri — aktivite geçmişi korunmali, cascade delete engellendi
        modelBuilder.Entity<UserActivity>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserActivity>()
            .HasOne(a => a.Question)
            .WithMany()
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Restrict);

        // Kullanıcı + tarih bazlı sorgular için bileşik index
        modelBuilder.Entity<UserActivity>()
            .HasIndex(a => new { a.UserId, a.SolvedAt });
    }
}