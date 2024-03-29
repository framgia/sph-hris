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
    [Migration("20230105035553_TimeIn")]
    partial class TimeIn
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
                            CreatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 719, DateTimeKind.Local).AddTicks(7735),
                            Name = "Morning Shift",
                            UpdatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(5081)
                        });
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
                            CreatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7261),
                            Email = "johndoe@sun-asterisk.com",
                            EmployeeScheduleId = 1,
                            IsOnline = false,
                            Name = "John Doe",
                            RoleId = 0,
                            UpdatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7262)
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

                    b.Property<int>("EmployeeScheduleId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("From")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("To")
                        .HasColumnType("time");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeScheduleId")
                        .IsUnique();

                    b.ToTable("WorkingDayTimes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6191),
                            EmployeeScheduleId = 1,
                            From = new TimeSpan(0, 9, 0, 0, 0),
                            To = new TimeSpan(0, 6, 0, 0, 0),
                            UpdatedAt = new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6194)
                        });
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
                    b.HasOne("api.Entities.EmployeeSchedule", null)
                        .WithOne("WorkingDayTime")
                        .HasForeignKey("api.Entities.WorkingDayTime", "EmployeeScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("api.Entities.EmployeeSchedule", b =>
                {
                    b.Navigation("Users");

                    b.Navigation("WorkingDayTime")
                        .IsRequired();
                });

            modelBuilder.Entity("api.Entities.User", b =>
                {
                    b.Navigation("TimeEntries");
                });
#pragma warning restore 612, 618
        }
    }
}
