using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddLeaveModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LeaveTypes",
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
                    table.PrimaryKey("PK_LeaveTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLeaderId = table.Column<int>(type: "int", nullable: true),
                    ProjectSubLeaderId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Users_ProjectLeaderId",
                        column: x => x.ProjectLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Users_ProjectSubLeaderId",
                        column: x => x.ProjectSubLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Undertimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    OtherProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    From = table.Column<TimeSpan>(type: "time", nullable: false),
                    To = table.Column<TimeSpan>(type: "time", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                name: "Leaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    LeaveTypeId = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    OtherProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LeaveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsWithPay = table.Column<bool>(type: "bit", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leaves_LeaveTypes_LeaveTypeId",
                        column: x => x.LeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Leaves_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Leaves_Users_UserId",
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

            migrationBuilder.CreateTable(
                name: "LeaveProject",
                columns: table => new
                {
                    LeavesId = table.Column<int>(type: "int", nullable: false),
                    ProjectsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveProject", x => new { x.LeavesId, x.ProjectsId });
                    table.ForeignKey(
                        name: "FK_LeaveProject_Leaves_LeavesId",
                        column: x => x.LeavesId,
                        principalTable: "Leaves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LeaveProject_Projects_ProjectsId",
                        column: x => x.ProjectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "LeaveTypes",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Sick leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Bereavement leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Emergency leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 4, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Vacation leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 5, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Maternity/Paternity leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 6, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Undertime", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "CreatedAt", "Name", "ProjectLeaderId", "ProjectSubLeaderId", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Admin", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Casec", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Shaperon", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 4, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "01Booster", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 5, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Edge", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 6, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "DTS", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 7, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "OJT", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 8, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Safie", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 9, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "AAA Education", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 10, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Development Training", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 11, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Yamato", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 12, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Next Base", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 13, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "MetaJobs", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 14, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Prrrr", 2, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 15, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Aironworks", 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 16, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "OsakaMetro", 1, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 17, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Others", null, null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveProject_ProjectsId",
                table: "LeaveProject",
                column: "ProjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_LeaveTypeId",
                table: "Leaves",
                column: "LeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_ManagerId",
                table: "Leaves",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_UserId",
                table: "Leaves",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectLeaderId",
                table: "Projects",
                column: "ProjectLeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectSubLeaderId",
                table: "Projects",
                column: "ProjectSubLeaderId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeaveProject");

            migrationBuilder.DropTable(
                name: "ProjectUndertime");

            migrationBuilder.DropTable(
                name: "Leaves");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Undertimes");

            migrationBuilder.DropTable(
                name: "LeaveTypes");
        }
    }
}
