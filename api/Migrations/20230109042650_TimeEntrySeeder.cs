using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TimeEntrySeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 49, 836, DateTimeKind.Local).AddTicks(7597), new DateTime(2023, 1, 9, 12, 26, 49, 839, DateTimeKind.Local).AddTicks(9726) });

            migrationBuilder.InsertData(
                table: "Times",
                columns: new[] { "Id", "CreatedAt", "Remarks", "TimeHour", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2495), "First time in", new TimeSpan(0, 9, 15, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2495) },
                    { 2, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2499), "Second time in", new TimeSpan(0, 9, 15, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2499) },
                    { 3, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2500), "Third time in", new TimeSpan(0, 10, 15, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2501) },
                    { 4, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2502), "First time out", new TimeSpan(0, 18, 15, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2502) },
                    { 5, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2503), "Second time out", new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2503) },
                    { 6, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2504), "Third time out", new TimeSpan(0, 19, 59, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2504) }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2465), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2477) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "EmployeeScheduleId", "IsOnline", "Name", "RoleId", "UpdatedAt" },
                values: new object[] { 2, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2480), "reanschwarzer@sun-asterisk.com", 1, false, "Rean Schwarzer", 0, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2481) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 49, 840, DateTimeKind.Local).AddTicks(2193), new DateTime(2023, 1, 9, 12, 26, 49, 840, DateTimeKind.Local).AddTicks(2200) });

            migrationBuilder.InsertData(
                table: "TimeEntries",
                columns: new[] { "Id", "CreatedAt", "Date", "EndTime", "StartTime", "TimeInId", "TimeOutId", "TrackedHours", "UpdatedAt", "UserId", "WorkedHours" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2520), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2521), new TimeSpan(0, 18, 30, 0, 0), new TimeSpan(0, 9, 30, 0, 0), 1, 4, new TimeSpan(0, 8, 0, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2521), 1, new TimeSpan(0, 8, 0, 0, 0) },
                    { 2, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2607), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2608), new TimeSpan(0, 18, 30, 0, 0), new TimeSpan(0, 9, 30, 0, 0), 2, 5, new TimeSpan(0, 8, 0, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2607), 2, new TimeSpan(0, 8, 15, 0, 0) },
                    { 3, new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2626), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2627), new TimeSpan(0, 18, 30, 0, 0), new TimeSpan(0, 9, 30, 0, 0), 3, 6, new TimeSpan(0, 8, 0, 0, 0), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2627), 1, new TimeSpan(0, 8, 44, 0, 0) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 719, DateTimeKind.Local).AddTicks(7735), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(5081) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7261), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7262) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6191), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6194) });
        }
    }
}
