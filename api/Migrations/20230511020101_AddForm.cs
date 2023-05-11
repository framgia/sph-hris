using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddForm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Forms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Field = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Forms_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(2533), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(2534) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4079), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4081) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4386), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4387) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4390), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4391) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(5604), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(5606) });

            migrationBuilder.CreateIndex(
                name: "IX_Forms_UserId",
                table: "Forms",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Forms");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(5133), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(5135) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7267), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7274) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7591), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7593) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7595), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7596) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(8724), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(8727) });
        }
    }
}
