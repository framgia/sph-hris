using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLeaveSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Leaves",
                columns: new[] { "Id", "CreatedAt", "IsLeaderApproved", "IsManagerApproved", "IsWithPay", "LeaveDate", "LeaveTypeId", "ManagerId", "OtherProject", "ProjectId", "Reason", "UpdatedAt", "UserId", "Days" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, false, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1, 1, "None", 1, "Leave lang guds", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 1, 1.5f },
                    { 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, true, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 6, 2, "None", 4, "Vacation leave", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 2, 2.0f }
                });

            migrationBuilder.InsertData(
            table: "LeaveProject",
            columns: new[] { "LeavesId", "ProjectsId" },
            values: new object[,]
            {
                    { 1, 1 },
                    { 2, 6}
            });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                            table: "Leaves",
                            keyColumn: "Id",
                            keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Leaves",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "LeaveProject",
                keyColumn: "LeavesId",
                keyValue: 1);

            migrationBuilder.DeleteData(
            table: "LeaveProject",
            keyColumn: "LeavesId",
            keyValue: 2);
        }
    }
}
