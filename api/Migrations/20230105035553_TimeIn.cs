using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TimeIn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeSchedules",
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
                    table.PrimaryKey("PK_EmployeeSchedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Times",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeHour = table.Column<TimeSpan>(type: "time", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Times", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    EmployeeScheduleId = table.Column<int>(type: "int", nullable: false),
                    IsOnline = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_EmployeeSchedules_EmployeeScheduleId",
                        column: x => x.EmployeeScheduleId,
                        principalTable: "EmployeeSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkingDayTimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeScheduleId = table.Column<int>(type: "int", nullable: false),
                    From = table.Column<TimeSpan>(type: "time", nullable: false),
                    To = table.Column<TimeSpan>(type: "time", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingDayTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingDayTimes_EmployeeSchedules_EmployeeScheduleId",
                        column: x => x.EmployeeScheduleId,
                        principalTable: "EmployeeSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TimeInId = table.Column<int>(type: "int", nullable: true),
                    TimeOutId = table.Column<int>(type: "int", nullable: true),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WorkedHours = table.Column<TimeSpan>(type: "time", nullable: false),
                    TrackedHours = table.Column<TimeSpan>(type: "time", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeEntries_Times_TimeInId",
                        column: x => x.TimeInId,
                        principalTable: "Times",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TimeEntries_Times_TimeOutId",
                        column: x => x.TimeOutId,
                        principalTable: "Times",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TimeEntries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "EmployeeSchedules",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 1, 5, 11, 55, 52, 719, DateTimeKind.Local).AddTicks(7735), "Morning Shift", new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(5081) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "EmployeeScheduleId", "IsOnline", "Name", "RoleId", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7261), "johndoe@sun-asterisk.com", 1, false, "John Doe", 0, new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7262) });

            migrationBuilder.InsertData(
                table: "WorkingDayTimes",
                columns: new[] { "Id", "CreatedAt", "EmployeeScheduleId", "From", "To", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6191), 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6194) });

            migrationBuilder.CreateIndex(
                name: "IX_TimeEntries_TimeInId",
                table: "TimeEntries",
                column: "TimeInId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeEntries_TimeOutId",
                table: "TimeEntries",
                column: "TimeOutId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeEntries_UserId",
                table: "TimeEntries",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmployeeScheduleId",
                table: "Users",
                column: "EmployeeScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDayTimes_EmployeeScheduleId",
                table: "WorkingDayTimes",
                column: "EmployeeScheduleId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeEntries");

            migrationBuilder.DropTable(
                name: "WorkingDayTimes");

            migrationBuilder.DropTable(
                name: "Times");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "EmployeeSchedules");
        }
    }
}
