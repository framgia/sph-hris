using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddLeaveIsDeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Leaves_LeaveId",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Leaves",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 798, DateTimeKind.Local).AddTicks(8855), new DateTime(2023, 6, 8, 10, 7, 6, 798, DateTimeKind.Local).AddTicks(8857) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(1605), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(1609) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2264), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2267) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2273), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(2274) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(4795), new DateTime(2023, 6, 8, 10, 7, 6, 799, DateTimeKind.Local).AddTicks(4808) });

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Leaves_LeaveId",
                table: "Notifications",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Leaves_LeaveId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Leaves");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(5190), new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(5192) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6538), new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6540) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6878), new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6880) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6883), new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(6884) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(8543), new DateTime(2023, 6, 6, 13, 30, 51, 433, DateTimeKind.Local).AddTicks(8549) });

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Leaves_LeaveId",
                table: "Notifications",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
