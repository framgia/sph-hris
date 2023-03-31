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
    public DbSet<Role> Roles { get; set; } = default!;
    public DbSet<LeaveType> LeaveTypes { get; set; } = default!;
    public DbSet<Project> Projects { get; set; } = default!;
    public DbSet<Leave> Leaves { get; set; } = default!;
    public DbSet<MultiProject> MultiProjects { get; set; } = default!;
    public DbSet<Notification> Notifications { get; set; } = default!;
    public DbSet<LeaveNotification> LeaveNotifications { get; set; } = default!;
    public DbSet<OvertimeNotification> OvertimeNotifications { get; set; } = default!;
    public DbSet<ChangeShiftNotification> ChangeShiftNotifications { get; set; } = default!;
    public DbSet<ESLChangeShiftNotification> ESLChangeShiftNotifications { get; set; } = default!;
    public DbSet<ESLOffsetNotification> ESLOffsetNotifications { get; set; } = default!;
    public DbSet<Overtime> Overtimes { get; set; } = default!;
    public DbSet<ChangeShiftRequest> ChangeShiftRequests { get; set; } = default!;
    public DbSet<ESLChangeShiftRequest> ESLChangeShiftRequests { get; set; } = default!;
    public DbSet<Position> Positions { get; set; } = default!;
    public DbSet<ESLOffset> ESLOffsets { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeSchedule>().HasData(
            DatabaseSeeder.employeeSchedule
        );
        modelBuilder.Entity<WorkingDayTime>().HasData(
            DatabaseSeeder.workingDayTime
        );
        modelBuilder.Entity<Position>().HasData(
            DatabaseSeeder.positions
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
        modelBuilder.Entity<Role>().HasData(
            DatabaseSeeder.roles
        );
        modelBuilder.Entity<LeaveType>().HasData(
            DatabaseSeeder.leaveTypes
        );
        modelBuilder.Entity<Project>().HasData(
            DatabaseSeeder.projects
        );
        modelBuilder.Entity<Media>().HasData(
            DatabaseSeeder.media()
        );

        modelBuilder.Entity<MultiProject>().HasData(
            DatabaseSeeder.multiProjects
        );

        modelBuilder.Entity<Overtime>().HasData(
            DatabaseSeeder.overtimes
        );


        modelBuilder.Entity<Overtime>().HasOne(x => x.User).WithMany(e => e.Overtimes).OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Overtime>().HasOne(x => x.TimeEntry).WithOne(e => e.Overtime).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ChangeShiftRequest>().HasOne(x => x.TimeEntry).WithOne(e => e.ChangeShiftRequest).OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ChangeShiftRequest>().HasOne(x => x.Manager).WithMany().OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ChangeShiftRequest>().HasOne(x => x.User).WithMany().OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ESLChangeShiftRequest>().HasOne(x => x.TeamLeader).WithMany().OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ESLChangeShiftRequest>().HasOne(x => x.User).WithMany().OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ESLChangeShiftNotification>().HasOne(x => x.ESLChangeShiftRequest).WithMany().OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ESLOffset>().HasOne(x => x.TeamLeader).WithMany().OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ESLOffset>().HasOne(x => x.User).WithMany().OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<ESLOffset>().HasOne(x => x.TimeEntry).WithMany(x => x.ESLOffsets).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Notification>().HasDiscriminator();
        modelBuilder.Entity<LeaveNotification>().HasData(
            DatabaseSeeder.notifications_leave
        );
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
