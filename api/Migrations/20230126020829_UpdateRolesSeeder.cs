using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRolesSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[] { 3, new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3772), "Employee", new DateTime(2023, 1, 26, 10, 8, 28, 99, DateTimeKind.Local).AddTicks(3773) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
