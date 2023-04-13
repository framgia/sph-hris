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
                values: new object[] { new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(3599), new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(3600) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4665), new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4667) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4892), new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4893) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4894), new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(4895) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(6321), new DateTime(2023, 4, 13, 17, 3, 38, 426, DateTimeKind.Local).AddTicks(6324) });

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
