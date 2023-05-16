using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserPositions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(3145), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(3147) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5411), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5417) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5754), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5756) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5758), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(5759) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(6627), new DateTime(2023, 5, 16, 11, 43, 8, 757, DateTimeKind.Local).AddTicks(6629) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PositionId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25,
                column: "PositionId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30,
                column: "PositionId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68,
                column: "PositionId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72,
                column: "PositionId",
                value: 7);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(6928), new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(6930) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(8695), new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(8698) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(9009), new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(9010) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(9013), new DateTime(2023, 5, 12, 16, 22, 28, 330, DateTimeKind.Local).AddTicks(9014) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 12, 16, 22, 28, 331, DateTimeKind.Local).AddTicks(96), new DateTime(2023, 5, 12, 16, 22, 28, 331, DateTimeKind.Local).AddTicks(98) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68,
                column: "PositionId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72,
                column: "PositionId",
                value: 4);
        }
    }
}
