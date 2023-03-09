using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class OvertimeSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(5080), new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(5083) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(9182), new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(9186) });

            migrationBuilder.InsertData(
                table: "Overtimes",
                columns: new[] { "Id", "ApprovedMinutes", "CreatedAt", "IsLeaderApproved", "IsManagerApproved", "ManagerId", "OtherProject", "OvertimeDate", "Remarks", "RequestedMinutes", "TimeEntryId", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, 125, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, true, 33, "Other project", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.", 125, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 33 },
                    { 2, 125, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), true, false, 33, "Other project", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.", 125, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 53 },
                    { 3, 125, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), null, null, 33, "Other project", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, id maiores perspiciatis animi assumenda, non laudantium qui doloribus soluta accusamus eaque et voluptate. Porro, explicabo rem fugit vel nisi eligendi.", 125, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), 64 }
                });

            migrationBuilder.InsertData(
                table: "MultiProjects",
                columns: new[] { "Id", "CreatedAt", "LeaveId", "OvertimeId", "ProjectId", "ProjectLeaderId", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { 2, new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7278), null, 2, 1, 1, "overtime", new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7281) },
                    { 3, new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7685), null, 3, 1, 1, "overtime", new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7686) },
                    { 4, new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7690), null, 1, 1, 1, "overtime", new DateTime(2023, 3, 9, 11, 5, 24, 308, DateTimeKind.Local).AddTicks(7691) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 3, 15, 7, 33, 472, DateTimeKind.Local).AddTicks(1585), new DateTime(2023, 3, 3, 15, 7, 33, 472, DateTimeKind.Local).AddTicks(1588) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 3, 15, 7, 33, 472, DateTimeKind.Local).AddTicks(4176), new DateTime(2023, 3, 3, 15, 7, 33, 472, DateTimeKind.Local).AddTicks(4180) });
        }
    }
}
