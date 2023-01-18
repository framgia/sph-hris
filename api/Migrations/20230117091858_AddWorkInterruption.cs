using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkInterruption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkInterruptionTypes",
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
                    table.PrimaryKey("PK_WorkInterruptionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkInterruptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeEntryId = table.Column<int>(type: "int", nullable: false),
                    WorkInterruptionTypeId = table.Column<int>(type: "int", nullable: true),
                    OtherReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeOut = table.Column<TimeSpan>(type: "time", nullable: true),
                    TimeIn = table.Column<TimeSpan>(type: "time", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkInterruptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkInterruptions_TimeEntries_TimeEntryId",
                        column: x => x.TimeEntryId,
                        principalTable: "TimeEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkInterruptions_WorkInterruptionTypes_WorkInterruptionTypeId",
                        column: x => x.WorkInterruptionTypeId,
                        principalTable: "WorkInterruptionTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 557, DateTimeKind.Local).AddTicks(9570), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(5989) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3704), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3705), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3705) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3737), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3738), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3738) });

            migrationBuilder.UpdateData(
                table: "TimeEntries",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Date", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3794), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3795), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3794) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3653), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3654) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3683), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3683) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3684), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3684) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3685), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3686) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3686), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3687) });

            migrationBuilder.UpdateData(
                table: "Times",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3688), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3688) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3507), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3524) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3528), new DateTime(2023, 1, 17, 17, 18, 58, 121, DateTimeKind.Local).AddTicks(3529) });

            migrationBuilder.InsertData(
                table: "WorkInterruptionTypes",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(184), "Power Interruption", new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(185) },
                    { 2, new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1163), "Lost Internet Connection", new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1165) },
                    { 3, new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1166), "Emergency", new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1167) },
                    { 4, new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1167), "Errands", new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1168) },
                    { 5, new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1169), "Others", new DateTime(2023, 1, 17, 17, 18, 57, 562, DateTimeKind.Local).AddTicks(1169) }
                });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(8502), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(8508) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9786), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9787) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9789), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9790) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9791), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9792) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9793), new DateTime(2023, 1, 17, 17, 18, 57, 561, DateTimeKind.Local).AddTicks(9793) });

            migrationBuilder.CreateIndex(
                name: "IX_WorkInterruptions_TimeEntryId",
                table: "WorkInterruptions",
                column: "TimeEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkInterruptions_WorkInterruptionTypeId",
                table: "WorkInterruptions",
                column: "WorkInterruptionTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkInterruptions");

            migrationBuilder.DropTable(
                name: "WorkInterruptionTypes");

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 119, DateTimeKind.Local).AddTicks(6322), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(3854) });

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
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 822, DateTimeKind.Local).AddTicks(6529), new DateTime(2023, 1, 12, 17, 5, 8, 395, DateTimeKind.Local).AddTicks(9632) });

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
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6519), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(6525) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8034), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8036) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8092) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8094) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098), new DateTime(2023, 1, 11, 16, 29, 21, 121, DateTimeKind.Local).AddTicks(8098) });
        }
    }
}
