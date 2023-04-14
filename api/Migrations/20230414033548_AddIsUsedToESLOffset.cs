using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsUsedToESLOffset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ESLChangeShiftRequestId",
                table: "ESLOffsets",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsUsed",
                table: "ESLOffsets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(5133), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(5135) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7267), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7274) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7591), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7593) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7595), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(7596) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(8724), new DateTime(2023, 4, 14, 11, 35, 45, 930, DateTimeKind.Local).AddTicks(8727) });

            migrationBuilder.CreateIndex(
                name: "IX_ESLOffsets_ESLChangeShiftRequestId",
                table: "ESLOffsets",
                column: "ESLChangeShiftRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_ESLOffsets_ESLChangeShiftRequests_ESLChangeShiftRequestId",
                table: "ESLOffsets",
                column: "ESLChangeShiftRequestId",
                principalTable: "ESLChangeShiftRequests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ESLOffsets_ESLChangeShiftRequests_ESLChangeShiftRequestId",
                table: "ESLOffsets");

            migrationBuilder.DropIndex(
                name: "IX_ESLOffsets_ESLChangeShiftRequestId",
                table: "ESLOffsets");

            migrationBuilder.DropColumn(
                name: "ESLChangeShiftRequestId",
                table: "ESLOffsets");

            migrationBuilder.DropColumn(
                name: "IsUsed",
                table: "ESLOffsets");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(8237), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(8238) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9264), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9266) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9464), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9465) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9466), new DateTime(2023, 3, 31, 13, 43, 41, 964, DateTimeKind.Local).AddTicks(9467) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 31, 13, 43, 41, 965, DateTimeKind.Local).AddTicks(243), new DateTime(2023, 3, 31, 13, 43, 41, 965, DateTimeKind.Local).AddTicks(244) });
        }
    }
}
