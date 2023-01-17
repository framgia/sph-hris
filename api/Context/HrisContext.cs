using api.Entities;
using api.Seeders;
using Microsoft.EntityFrameworkCore;

namespace api.Context;

public partial class HrisContext : DbContext
{
    public HrisContext(DbContextOptions<HrisContext> options)
        : base(options)
    {

    }
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<TimeEntry> TimeEntries { get; set; } = default!;
    public DbSet<Time> Times { get; set; } = default!;
    public DbSet<EmployeeSchedule> EmployeeSchedules { get; set; } = default!;
    public DbSet<WorkingDayTime> WorkingDayTimes { get; set; } = default!;
    public DbSet<Personal_Access_Token> Personal_Access_Tokens { get; set; } = default!;
    public DbSet<Media> Medias { get; set; } = default!;
    public DbSet<WorkInterruptionType> WorkInterruptionTypes { get; set; } = default!;
    public DbSet<WorkInterruption> WorkInterruptions { get; set; } = default!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeSchedule>().HasData(
            DatabaseSeeder.employeeSchedule
        );
        modelBuilder.Entity<WorkingDayTime>().HasData(
            DatabaseSeeder.workingDayTime
        );
        modelBuilder.Entity<User>().HasData(
            DatabaseSeeder.users()
        );
        modelBuilder.Entity<Time>().HasData(
            DatabaseSeeder.times()
        );
        modelBuilder.Entity<TimeEntry>().HasData(
            DatabaseSeeder.timeEntries()
        );
        modelBuilder.Entity<WorkInterruptionType>().HasData(
            DatabaseSeeder.workInterruptionType
        );
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
