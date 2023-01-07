using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkingDayTimeSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 119, DateTimeKind.Local).AddTicks(6322), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(3854) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6577), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6579), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6578) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6610), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6611), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6611) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6632), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6633), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6632) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6557), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6557) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6560), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6561) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6562), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6562) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6563), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6563) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6564), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6564) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6565), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6565) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6529), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6541) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6543), new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6544) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6519), new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6525) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8034), new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8036) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092), new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094), new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098), new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 551, DateTimeKind.Local).AddTicks(1698), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(3243) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2520), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2521), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2521) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2607), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2608), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2607) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2626), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2627), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2627) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2495), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2495) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2499), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2499) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2500), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2501) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2502), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2502) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2503), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2503) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2504), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2504) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5320), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2477) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2480), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2481) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(4249), new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(4251) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5104), new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5105) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5107), new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5107) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5109), new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5109) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "From", "To", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5110), new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5110) });
        }
    }
}
