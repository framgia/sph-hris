using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 25, 18, 19, 47, 629, DateTimeKind.Local).AddTicks(1782), "Manager", new DateTime(2023, 1, 25, 18, 19, 47, 629, DateTimeKind.Local).AddTicks(1783) },
                    { 2, new DateTime(2023, 1, 25, 18, 19, 47, 629, DateTimeKind.Local).AddTicks(2255), "HR Admin", new DateTime(2023, 1, 25, 18, 19, 47, 629, DateTimeKind.Local).AddTicks(2256) }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "RoleId", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 25, 18, 19, 47, 999, DateTimeKind.Local).AddTicks(973), 2, new DateTime(2023, 1, 25, 18, 19, 47, 999, DateTimeKind.Local).AddTicks(991) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "RoleId", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 25, 18, 19, 47, 999, DateTimeKind.Local).AddTicks(994), 1, new DateTime(2023, 1, 25, 18, 19, 47, 999, DateTimeKind.Local).AddTicks(995) });


            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "RoleId", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3507), 0, new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3524) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "RoleId", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3528), 0, new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3529) });
        }
    }
}
