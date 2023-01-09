﻿using api.Entities;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeSchedule>().HasData(
            DatabaseSeeder.employeeSchedule
        );
        modelBuilder.Entity<WorkingDayTime>().HasData(
            DatabaseSeeder.workingDayTime
        );
        modelBuilder.Entity<User>().HasData(
            DatabaseSeeder.user
        );
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}