using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyLeaves : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectUndertime");

            migrationBuilder.DropTable(
                name: "Undertimes");

            migrationBuilder.DeleteData(
                table: "Leaves",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Leaves",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<float>(
                name: "Days",
                table: "Leaves",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Days",
                table: "Leaves");

            migrationBuilder.CreateTable(
                name: "Undertimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    From = table.Column<TimeSpan>(type: "time", nullable: false),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    IsManagerApproved = table.Column<bool>(type: "bit", nullable: true),
                    OtherProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    To = table.Column<TimeSpan>(type: "time", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Undertimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Undertimes_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Undertimes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectUndertime",
                columns: table => new
                {
                    ProjectsId = table.Column<int>(type: "int", nullable: false),
                    UndertimesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectUndertime", x => new { x.ProjectsId, x.UndertimesId });
                    table.ForeignKey(
                        name: "FK_ProjectUndertime_Projects_ProjectsId",
                        column: x => x.ProjectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectUndertime_Undertimes_UndertimesId",
                        column: x => x.UndertimesId,
                        principalTable: "Undertimes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Leaves",
                columns: new[] { "Id", "CreatedAt", "IsLeaderApproved", "IsManagerApproved", "IsWithPay", "LeaveDate", "LeaveTypeId", "ManagerId", "OtherProject", "ProjectId", "Reason", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, false, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1, 1, "None", 1, "Leave lang guds", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, true, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 4, 1, "None", 3, "Vacation leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 }
                });

            migrationBuilder.InsertData(
                table: "Undertimes",
                columns: new[] { "Id", "CreatedAt", "From", "IsLeaderApproved", "IsManagerApproved", "ManagerId", "OtherProject", "ProjectId", "Reason", "To", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new TimeSpan(0, 9, 30, 0, 0), true, true, 1, "None", 1, "Leave lang guds", new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), new TimeSpan(0, 9, 30, 0, 0), true, true, 1, "None", 1, "Under lang guds", new TimeSpan(0, 18, 30, 0, 0), new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUndertime_UndertimesId",
                table: "ProjectUndertime",
                column: "UndertimesId");

            migrationBuilder.CreateIndex(
                name: "IX_Undertimes_ManagerId",
                table: "Undertimes",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Undertimes_UserId",
                table: "Undertimes",
                column: "UserId");
        }
    }
}
