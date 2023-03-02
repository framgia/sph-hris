using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class OvertimeLeaveProjectToMultiProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Leaves",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Leaves",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropTable(
                name: "LeaveProjects");

            migrationBuilder.AddColumn<int>(
                name: "OvertimeId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Overtimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    OtherProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OvertimeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RequestedMinutes = table.Column<float>(type: "real", nullable: false),
                    ApprovedMinutes = table.Column<float>(type: "real", nullable: true),
                    IsLeaderApproved = table.Column<bool>(type: "bit", nullable: true),
                    IsManagerApproved = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Overtimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Overtimes_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Overtimes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MultiProjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    ProjectLeaderId = table.Column<int>(type: "int", nullable: true),
                    LeaveId = table.Column<int>(type: "int", nullable: true),
                    OvertimeId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MultiProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MultiProjects_Leaves_LeaveId",
                        column: x => x.LeaveId,
                        principalTable: "Leaves",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MultiProjects_Overtimes_OvertimeId",
                        column: x => x.OvertimeId,
                        principalTable: "Overtimes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MultiProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MultiProjects_Users_ProjectLeaderId",
                        column: x => x.ProjectLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 2, 12, 2, 51, 3, DateTimeKind.Local).AddTicks(295), new DateTime(2023, 3, 2, 12, 2, 51, 3, DateTimeKind.Local).AddTicks(296) });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_OvertimeId",
                table: "Notifications",
                column: "OvertimeId");

            migrationBuilder.CreateIndex(
                name: "IX_MultiProjects_LeaveId",
                table: "MultiProjects",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_MultiProjects_OvertimeId",
                table: "MultiProjects",
                column: "OvertimeId");

            migrationBuilder.CreateIndex(
                name: "IX_MultiProjects_ProjectId",
                table: "MultiProjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_MultiProjects_ProjectLeaderId",
                table: "MultiProjects",
                column: "ProjectLeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_Overtimes_ManagerId",
                table: "Overtimes",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Overtimes_UserId",
                table: "Overtimes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Overtimes_OvertimeId",
                table: "Notifications",
                column: "OvertimeId",
                principalTable: "Overtimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Leaves",
                columns: new[] { "Id", "CreatedAt", "IsLeaderApproved", "IsManagerApproved", "IsWithPay", "LeaveDate", "LeaveTypeId", "ManagerId", "OtherProject", "ProjectId", "Reason", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, false, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1, 1, "None", 1, "Leave lang guds", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, true, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 4, 1, "None", 3, "Vacation leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1 }
                });

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Overtimes_OvertimeId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "MultiProjects");

            migrationBuilder.DropTable(
                name: "Overtimes");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_OvertimeId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "OvertimeId",
                table: "Notifications");

            migrationBuilder.CreateTable(
                name: "LeaveProjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    ProjectLeaderId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LeaveId = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveProjects_Leaves_LeaveId",
                        column: x => x.LeaveId,
                        principalTable: "Leaves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LeaveProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LeaveProjects_Users_ProjectLeaderId",
                        column: x => x.ProjectLeaderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "LeaveProjects",
                columns: new[] { "Id", "CreatedAt", "LeaveId", "ProjectId", "ProjectLeaderId", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(7684), 1, 1, 1, new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(7685) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(9699), new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(9701) });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveProjects_LeaveId",
                table: "LeaveProjects",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveProjects_ProjectId",
                table: "LeaveProjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveProjects_ProjectLeaderId",
                table: "LeaveProjects",
                column: "ProjectLeaderId");
        }
    }
}
