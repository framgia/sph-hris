using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddESLChangeShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ESLChangeShiftRequestId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ESLChangeShiftRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TimeEntryId = table.Column<int>(type: "int", nullable: false),
                    TeamLeaderId = table.Column<int>(type: "int", nullable: false),
                    TimeIn = table.Column<TimeSpan>(type: "time", nullable: false),
                    TimeOut = table.Column<TimeSpan>(type: "time", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ESLChangeShiftRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ESLChangeShiftRequests_TimeEntries_TimeEntryId",
                        column: x => x.TimeEntryId,
                        principalTable: "TimeEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ESLChangeShiftRequests_Users_TeamLeaderId",
                        column: x => x.TeamLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ESLChangeShiftRequests_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ESLChangeShiftRequestId",
                table: "Notifications",
                column: "ESLChangeShiftRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLChangeShiftRequests_TeamLeaderId",
                table: "ESLChangeShiftRequests",
                column: "TeamLeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLChangeShiftRequests_TimeEntryId",
                table: "ESLChangeShiftRequests",
                column: "TimeEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_ESLChangeShiftRequests_UserId",
                table: "ESLChangeShiftRequests",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_ESLChangeShiftRequests_ESLChangeShiftRequestId",
                table: "Notifications",
                column: "ESLChangeShiftRequestId",
                principalTable: "ESLChangeShiftRequests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_ESLChangeShiftRequests_ESLChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "ESLChangeShiftRequests");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ESLChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ESLChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(5047), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(5048) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(7737), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(7754) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8253), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8256) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8259), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8260) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 611, DateTimeKind.Local).AddTicks(140), new DateTime(2023, 3, 21, 14, 6, 30, 611, DateTimeKind.Local).AddTicks(152) });
        }
    }
}
