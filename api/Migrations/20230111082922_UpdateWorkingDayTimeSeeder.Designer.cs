﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Context;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(HrisContext))]
    [Migration("20230111082922_UpdateWorkingDayTimeSeeder")]
    partial class UpdateWorkingDayTimeSeeder
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Entities.EmployeeSchedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("EmployeeSchedules");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 119, DateTimeKind.Local).AddTicks(6322),
                            Name = "Morning Shift",
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(3854)
                        });
                });

            modelBuilder.Entity("api.Entities.Media", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CollectionName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MimeType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TimeId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("TimeId");

                    b.ToTable("Medias");
                });

            modelBuilder.Entity("api.Entities.Time", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("TimeHour")
                        .HasColumnType("time");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Times");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6557),
                            Remarks = "First time in",
                            TimeHour = new TimeSpan(0, 9, 15, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6557)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6560),
                            Remarks = "Second time in",
                            TimeHour = new TimeSpan(0, 9, 15, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6561)
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6562),
                            Remarks = "Third time in",
                            TimeHour = new TimeSpan(0, 10, 15, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6562)
                        },
                        new
                        {
                            Id = 4,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6563),
                            Remarks = "First time out",
                            TimeHour = new TimeSpan(0, 18, 15, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6563)
                        },
                        new
                        {
                            Id = 5,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6564),
                            Remarks = "Second time out",
                            TimeHour = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6564)
                        },
                        new
                        {
                            Id = 6,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6565),
                            Remarks = "Third time out",
                            TimeHour = new TimeSpan(0, 19, 59, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6565)
                        });
                });

            modelBuilder.Entity("api.Entities.TimeEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.Property<int?>("TimeInId")
                        .HasColumnType("int");

                    b.Property<int?>("TimeOutId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("TrackedHours")
                        .HasColumnType("time");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("WorkedHours")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("TimeInId");

                    b.HasIndex("TimeOutId");

                    b.HasIndex("UserId");

                    b.ToTable("TimeEntries");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6577),
                            Date = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6579),
                            EndTime = new TimeSpan(0, 18, 30, 0, 0),
                            StartTime = new TimeSpan(0, 9, 30, 0, 0),
                            TimeInId = 1,
                            TimeOutId = 4,
                            TrackedHours = new TimeSpan(0, 8, 0, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6578),
                            UserId = 1,
                            WorkedHours = new TimeSpan(0, 8, 0, 0, 0)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6610),
                            Date = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6611),
                            EndTime = new TimeSpan(0, 18, 30, 0, 0),
                            StartTime = new TimeSpan(0, 9, 30, 0, 0),
                            TimeInId = 2,
                            TimeOutId = 5,
                            TrackedHours = new TimeSpan(0, 8, 0, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6611),
                            UserId = 2,
                            WorkedHours = new TimeSpan(0, 8, 15, 0, 0)
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6632),
                            Date = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6633),
                            EndTime = new TimeSpan(0, 18, 30, 0, 0),
                            StartTime = new TimeSpan(0, 9, 30, 0, 0),
                            TimeInId = 3,
                            TimeOutId = 6,
                            TrackedHours = new TimeSpan(0, 8, 0, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6632),
                            UserId = 1,
                            WorkedHours = new TimeSpan(0, 8, 44, 0, 0)
                        });
                });

            modelBuilder.Entity("api.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmployeeScheduleId")
                        .HasColumnType("int");

                    b.Property<bool>("IsOnline")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeScheduleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6529),
                            Email = "johndoe@sun-asterisk.com",
                            EmployeeScheduleId = 1,
                            IsOnline = false,
                            Name = "John Doe",
                            RoleId = 0,
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6541)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6543),
                            Email = "reanschwarzer@sun-asterisk.com",
                            EmployeeScheduleId = 1,
                            IsOnline = false,
                            Name = "Rean Schwarzer",
                            RoleId = 0,
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6544)
                        });
                });

            modelBuilder.Entity("api.Entities.WorkingDayTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Day")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmployeeScheduleId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("From")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("To")
                        .HasColumnType("time");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeScheduleId");

                    b.ToTable("WorkingDayTimes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6519),
                            Day = "Monday",
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 30, 0, 0),
                            To = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6525)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8034),
                            Day = "Tuesday",
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 30, 0, 0),
                            To = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8036)
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092),
                            Day = "Wednesday",
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 30, 0, 0),
                            To = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092)
                        },
                        new
                        {
                            Id = 4,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094),
                            Day = "Thursday",
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 30, 0, 0),
                            To = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094)
                        },
                        new
                        {
                            Id = 5,
                            CreatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098),
                            Day = "Friday",
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 30, 0, 0),
                            To = new TimeSpan(0, 18, 30, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098)
                        });
                });

            modelBuilder.Entity("api.Entities.Media", b =>
                {
                    b.HasOne("api.Entities.Time", null)
                        .WithMany("Media")
                        .HasForeignKey("TimeId");
                });

            modelBuilder.Entity("api.Entities.TimeEntry", b =>
                {
                    b.HasOne("api.Entities.Time", "TimeIn")
                        .WithMany()
                        .HasForeignKey("TimeInId");

                    b.HasOne("api.Entities.Time", "TimeOut")
                        .WithMany()
                        .HasForeignKey("TimeOutId");

                    b.HasOne("api.Entities.User", "User")
                        .WithMany("TimeEntries")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TimeIn");

                    b.Navigation("TimeOut");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Entities.User", b =>
                {
                    b.HasOne("api.Entities.EmployeeSchedule", "EmployeeSchedule")
                        .WithMany("Users")
                        .HasForeignKey("EmployeeScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployeeSchedule");
                });

            modelBuilder.Entity("api.Entities.WorkingDayTime", b =>
                {
                    b.HasOne("api.Entities.EmployeeSchedule", "EmployeeSchedule")
                        .WithMany("WorkingDayTimes")
                        .HasForeignKey("EmployeeScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployeeSchedule");
                });

            modelBuilder.Entity("api.Entities.EmployeeSchedule", b =>
                {
                    b.Navigation("Users");

                    b.Navigation("WorkingDayTimes");
                });

            modelBuilder.Entity("api.Entities.Time", b =>
                {
                    b.Navigation("Media");
                });

            modelBuilder.Entity("api.Entities.User", b =>
                {
                    b.Navigation("TimeEntries");
                });
#pragma warning restore 612, 618
        }
    }
}
