using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDefaultTimestamps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 92, DateTimeKind.Local).AddTicks(9203), new DateTime(2023, 1, 26, 10, 8, 28, 98, DateTimeKind.Local).AddTicks(1966) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3054), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3055) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3769), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3771) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3772), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3773) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9329), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9331), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9330) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9359), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9360), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9359) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9378), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9379), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9379) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9306), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9307) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9309), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9310) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9311), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9311) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9312), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9312) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9313), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9313) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9314), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9315) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9270), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9285) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9288), new DateTime(2023, 1, 26, 10, 8, 28, 708, DateTimeKind.Local).AddTicks(9289) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2001), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2003) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2746), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2747) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2748), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2749) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2750), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2750) });

            migrationBuilder.UpdateData(
                table: "WorkInterruptionTypes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2751), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(2752) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(255), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(269) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1608), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1610) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1612), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1613) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1614), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1615) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1616), new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(1616) });
        }
    }
}
