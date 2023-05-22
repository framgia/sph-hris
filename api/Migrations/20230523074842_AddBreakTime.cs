using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddBreakTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "BreakFrom",
                table: "WorkingDayTimes",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "BreakTo",
                table: "WorkingDayTimes",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "BreakEndTime",
                table: "TimeEntries",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "BreakStartTime",
                table: "TimeEntries",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.InsertData(
                table: "EmployeeSchedules",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[] { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Afternoon Shift", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(2907), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(2909) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4411), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4414) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4744), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4745) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4748), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4749) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(5932), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(5936) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BreakEndTime", "BreakStartTime" },
                values: new object[] { new TimeSpan(0, 0, 0, 0, 0), new TimeSpan(0, 0, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BreakEndTime", "BreakStartTime" },
                values: new object[] { new TimeSpan(0, 0, 0, 0, 0), new TimeSpan(0, 0, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BreakEndTime", "BreakStartTime" },
                values: new object[] { new TimeSpan(0, 0, 0, 0, 0), new TimeSpan(0, 0, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BreakFrom", "BreakTo" },
                values: new object[] { new TimeSpan(0, 12, 0, 0, 0), new TimeSpan(0, 13, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BreakFrom", "BreakTo" },
                values: new object[] { new TimeSpan(0, 12, 0, 0, 0), new TimeSpan(0, 13, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BreakFrom", "BreakTo" },
                values: new object[] { new TimeSpan(0, 12, 0, 0, 0), new TimeSpan(0, 13, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "BreakFrom", "BreakTo" },
                values: new object[] { new TimeSpan(0, 12, 0, 0, 0), new TimeSpan(0, 13, 0, 0, 0) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "BreakFrom", "BreakTo" },
                values: new object[] { new TimeSpan(0, 12, 0, 0, 0), new TimeSpan(0, 13, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "WorkingDayTimes",
                columns: new[] { "Id", "BreakFrom", "BreakTo", "CreatedAt", "Day", "EmployeeScheduleId", "From", "To", "UpdatedAt" },
                values: new object[,]
                {
                    { 6, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 18, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Monday", 2, new TimeSpan(0, 13, 0, 0, 0), new TimeSpan(0, 22, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 7, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 18, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Tuesday", 2, new TimeSpan(0, 13, 0, 0, 0), new TimeSpan(0, 22, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 8, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 18, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Wednesday", 2, new TimeSpan(0, 13, 0, 0, 0), new TimeSpan(0, 22, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 9, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 18, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Thursday", 2, new TimeSpan(0, 13, 0, 0, 0), new TimeSpan(0, 22, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 10, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 18, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Friday", 2, new TimeSpan(0, 13, 0, 0, 0), new TimeSpan(0, 22, 0, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "BreakFrom",
                table: "WorkingDayTimes");

            migrationBuilder.DropColumn(
                name: "BreakTo",
                table: "WorkingDayTimes");

            migrationBuilder.DropColumn(
                name: "BreakEndTime",
                table: "TimeEntries");

            migrationBuilder.DropColumn(
                name: "BreakStartTime",
                table: "TimeEntries");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(3145), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(3147) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5411), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5417) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5754), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5756) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5758), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5759) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(6627), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(6629) });
        }
    }
}
