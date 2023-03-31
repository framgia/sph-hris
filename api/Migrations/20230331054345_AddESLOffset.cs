using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddESLOffset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ESLOffsetId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ESLOffsets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TimeEntryId = table.Column<int>(type: "int", nullable: false),
                    TeamLeaderId = table.Column<int>(type: "int", nullable: false),
                    TimeIn = table.Column<TimeSpan>(type: "time", nullable: false),
                    TimeOut = table.Column<TimeSpan>(type: "time", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ESLOffsets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ESLOffsets_TimeEntries_TimeEntryId",
                        column: x => x.TimeEntryId,
                        principalTable: "TimeEntries",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ESLOffsets_Users_TeamLeaderId",
                        column: x => x.TeamLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ESLOffsets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(8237), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(8238) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9264), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9266) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9464), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9465) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9466), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9467) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 965, DateTimeKind.Local).AddTicks(243), new DateTime(2023, 3, 31, 13, 43, 41, 965, DateTimeKind.Local).AddTicks(244) });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ESLOffsetId",
                table: "Notifications",
                column: "ESLOffsetId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLOffsets_TeamLeaderId",
                table: "ESLOffsets",
                column: "TeamLeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLOffsets_TimeEntryId",
                table: "ESLOffsets",
                column: "TimeEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLOffsets_UserId",
                table: "ESLOffsets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_ESLOffsets_ESLOffsetId",
                table: "Notifications",
                column: "ESLOffsetId",
                principalTable: "ESLOffsets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_ESLOffsets_ESLOffsetId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "ESLOffsets");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ESLOffsetId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ESLOffsetId",
                table: "Notifications");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(1039), new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(1041) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2408), new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2412) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2790), new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2792) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2794), new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(2794) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(3740), new DateTime(2023, 3, 30, 15, 7, 35, 729, DateTimeKind.Local).AddTicks(3742) });
        }
    }
}
