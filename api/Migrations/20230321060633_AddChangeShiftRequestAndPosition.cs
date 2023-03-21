using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddChangeShiftRequestAndPosition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ChangeShiftRequestId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChangeShiftRequestId",
                table: "MultiProjects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ChangeShiftRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TimeEntryId = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: false),
                    TimeIn = table.Column<TimeSpan>(type: "time", nullable: false),
                    TimeOut = table.Column<TimeSpan>(type: "time", nullable: false),
                    OtherProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsManagerApproved = table.Column<bool>(type: "bit", nullable: true),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeShiftRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangeShiftRequests_TimeEntries_TimeEntryId",
                        column: x => x.TimeEntryId,
                        principalTable: "TimeEntries",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ChangeShiftRequests_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ChangeShiftRequests_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ChangeShiftRequestId", "CreatedAt", "UpdatedAt" },
                values: new object[] { null, new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(5047), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(5048) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ChangeShiftRequestId", "CreatedAt", "UpdatedAt" },
                values: new object[] { null, new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(7737), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(7754) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ChangeShiftRequestId", "CreatedAt", "UpdatedAt" },
                values: new object[] { null, new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8253), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8256) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ChangeShiftRequestId", "CreatedAt", "UpdatedAt" },
                values: new object[] { null, new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8259), new DateTime(2023, 3, 21, 14, 6, 30, 610, DateTimeKind.Local).AddTicks(8260) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 21, 14, 6, 30, 611, DateTimeKind.Local).AddTicks(140), new DateTime(2023, 3, 21, 14, 6, 30, 611, DateTimeKind.Local).AddTicks(152) });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Manager", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 2, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Assistant Manager", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 3, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Admin", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 4, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Web Developer", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 5, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ESL Teacher", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PositionId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 16,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 17,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 18,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 19,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 20,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 21,
                column: "PositionId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 22,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 23,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 24,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 26,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 27,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 28,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 29,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 31,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 32,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 33,
                column: "PositionId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 34,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 35,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 36,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 37,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 38,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 39,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 40,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 41,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 42,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 43,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 44,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 45,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 46,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 47,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 48,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 49,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 50,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 51,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 52,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 53,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 54,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 55,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 56,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 57,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 58,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 59,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 60,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 61,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 62,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 63,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 64,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 65,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 66,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 67,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 69,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 70,
                column: "PositionId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 71,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 73,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 74,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 75,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 76,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 77,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 78,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 79,
                column: "PositionId",
                value: 4);

            migrationBuilder.CreateIndex(
                name: "IX_Users_PositionId",
                table: "Users",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ChangeShiftRequestId",
                table: "Notifications",
                column: "ChangeShiftRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_MultiProjects_ChangeShiftRequestId",
                table: "MultiProjects",
                column: "ChangeShiftRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangeShiftRequests_ManagerId",
                table: "ChangeShiftRequests",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangeShiftRequests_TimeEntryId",
                table: "ChangeShiftRequests",
                column: "TimeEntryId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChangeShiftRequests_UserId",
                table: "ChangeShiftRequests",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MultiProjects_ChangeShiftRequests_ChangeShiftRequestId",
                table: "MultiProjects",
                column: "ChangeShiftRequestId",
                principalTable: "ChangeShiftRequests",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_ChangeShiftRequests_ChangeShiftRequestId",
                table: "Notifications",
                column: "ChangeShiftRequestId",
                principalTable: "ChangeShiftRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Positions_PositionId",
                table: "Users",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MultiProjects_ChangeShiftRequests_ChangeShiftRequestId",
                table: "MultiProjects");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_ChangeShiftRequests_ChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Positions_PositionId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ChangeShiftRequests");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Users_PositionId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_MultiProjects_ChangeShiftRequestId",
                table: "MultiProjects");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ChangeShiftRequestId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ChangeShiftRequestId",
                table: "MultiProjects");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(4667), new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(4668) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5668), new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5669) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5882), new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5883) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5885), new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(5885) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(7282), new DateTime(2023, 3, 15, 15, 1, 29, 533, DateTimeKind.Local).AddTicks(7283) });
        }
    }
}
