using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddDayInWorkingDayTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WorkingDayTimes_EmployeeScheduleId",
                table: "WorkingDayTimes");

            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "WorkingDayTimes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 551, DateTimeKind.Local).AddTicks(1698), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(3243) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5320), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5321) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Day", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(4249), "Monday", new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(4251) });

            migrationBuilder.InsertData(
                table: "WorkingDayTimes",
                columns: new[] { "Id", "CreatedAt", "Day", "EmployeeScheduleId", "From", "To", "UpdatedAt" },
                values: new object[,]
                {
                    { 2, new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5104), "Tuesday", 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5105) },
                    { 3, new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5107), "Wednesday", 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5107) },
                    { 4, new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5109), "Thursday", 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5109) },
                    { 5, new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5110), "Friday", 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 10, 9, 41, 35, 552, DateTimeKind.Local).AddTicks(5110) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDayTimes_EmployeeScheduleId",
                table: "WorkingDayTimes",
                column: "EmployeeScheduleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WorkingDayTimes_EmployeeScheduleId",
                table: "WorkingDayTimes");

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "Day",
                table: "WorkingDayTimes");

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 842, DateTimeKind.Local).AddTicks(2441), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(5224) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(7531), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(7532) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(6491), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(6493) });

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDayTimes_EmployeeScheduleId",
                table: "WorkingDayTimes",
                column: "EmployeeScheduleId",
                unique: true);
        }
    }
}
