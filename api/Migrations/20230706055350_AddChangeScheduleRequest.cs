using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddChangeScheduleRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RelatedEntityId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ChangeScheduleRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsManagerApproved = table.Column<bool>(type: "bit", nullable: true),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeScheduleRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangeScheduleRequests_Users_UserId",
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
                values: new object[] { new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(579), new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(581) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(1965), new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(1967) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(2215), new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(2216) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(2218), new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(2219) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "RelatedEntityId", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(4791), null, new DateTime(2023, 7, 6, 13, 53, 47, 42, DateTimeKind.Local).AddTicks(4813) });

            migrationBuilder.CreateIndex(
                name: "IX_ChangeScheduleRequests_UserId",
                table: "ChangeScheduleRequests",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChangeScheduleRequests");

            migrationBuilder.DropColumn(
                name: "RelatedEntityId",
                table: "Notifications");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 798, DateTimeKind.Local).AddTicks(8855), new DateTime(2023, 6, 8, 10, 7, 6, 798, DateTimeKind.Local).AddTicks(8857) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(1605), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(1609) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2264), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2267) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2273), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2274) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(4795), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(4808) });
        }
    }
}
