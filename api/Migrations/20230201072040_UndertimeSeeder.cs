using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UndertimeSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Undertimes",
                columns: new[] { "Id", "CreatedAt", "From", "IsLeaderApproved", "IsManagerApproved", "ManagerId", "OtherProject", "ProjectId", "Reason", "To", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new TimeSpan(0, 9, 30, 0, 0), true, true, 1, "None", 1, "Leave lang guds", new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new TimeSpan(0, 9, 30, 0, 0), true, true, 1, "None", 1, "Under lang guds", new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Undertimes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Undertimes",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
