using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class PersonalAccessTokens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personal_Access_Tokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personal_Access_Tokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Personal_Access_Tokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 7, 494, DateTimeKind.Local).AddTicks(4725), new DateTime(2023, 1, 12, 17, 5, 7, 496, DateTimeKind.Local).AddTicks(3493) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9692), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9694), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9693) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9736), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9737), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9736) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9763), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9764), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9764) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9660), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9661) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9665), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9665) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9666), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9667) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9668), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9669) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9669), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9670) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9671), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9672) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9616), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9632) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9638), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9639) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 12, 17, 5, 7, 496, DateTimeKind.Local).AddTicks(5990), new DateTime(2023, 1, 12, 17, 5, 7, 496, DateTimeKind.Local).AddTicks(5993) });

            migrationBuilder.CreateIndex(
                name: "IX_Personal_Access_Tokens_UserId",
                table: "Personal_Access_Tokens",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personal_Access_Tokens");

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 49, 836, DateTimeKind.Local).AddTicks(7597), new DateTime(2023, 1, 9, 12, 26, 49, 839, DateTimeKind.Local).AddTicks(9726) });

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
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2465), new DateTime(2023, 1, 9, 12, 26, 50, 355, DateTimeKind.Local).AddTicks(2477) });

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
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 9, 12, 26, 49, 840, DateTimeKind.Local).AddTicks(2193), new DateTime(2023, 1, 9, 12, 26, 49, 840, DateTimeKind.Local).AddTicks(2200) });
        }
    }
}
