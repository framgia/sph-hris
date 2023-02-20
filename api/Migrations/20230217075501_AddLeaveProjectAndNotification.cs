using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddLeaveProjectAndNotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeaveProject");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Leaves",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "IsManagerApproved",
                table: "Leaves",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsLeaderApproved",
                table: "Leaves",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LeaveProjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaveId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    ProjectLeaderId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipientId = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReadAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    LeaveId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Leaves_LeaveId",
                        column: x => x.LeaveId,
                        principalTable: "Leaves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "LeaveProjects",
                columns: new[] { "Id", "CreatedAt", "LeaveId", "ProjectId", "ProjectLeaderId", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 2, 17, 15, 54, 59, 441, DateTimeKind.Local).AddTicks(8844), 1, 1, 1, new DateTime(2023, 2, 17, 15, 54, 59, 441, DateTimeKind.Local).AddTicks(8851) });

            migrationBuilder.InsertData(
                table: "Notifications",
                columns: new[] { "Id", "CreatedAt", "Data", "IsRead", "LeaveId", "ReadAt", "RecipientId", "Type", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 2, 17, 15, 54, 59, 442, DateTimeKind.Local).AddTicks(4733), "Some JSON Data", false, 1, null, 70, "leave", new DateTime(2023, 2, 17, 15, 54, 59, 442, DateTimeKind.Local).AddTicks(4742) });

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_ProjectId",
                table: "Leaves",
                column: "ProjectId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_LeaveId",
                table: "Notifications",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_RecipientId",
                table: "Notifications",
                column: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Projects_ProjectId",
                table: "Leaves",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Projects_ProjectId",
                table: "Leaves");

            migrationBuilder.DropTable(
                name: "LeaveProjects");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Leaves_ProjectId",
                table: "Leaves");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Leaves",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsManagerApproved",
                table: "Leaves",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsLeaderApproved",
                table: "Leaves",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

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

            migrationBuilder.CreateIndex(
                name: "IX_LeaveProject_ProjectsId",
                table: "LeaveProject",
                column: "ProjectsId");
        }
    }
}
