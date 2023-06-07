using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddManagerRemarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ManagerRemarks",
                table: "Overtimes",
                type: "nvarchar(max)",
                nullable: true);

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

            migrationBuilder.UpdateData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 1,
                column: "ManagerRemarks",
                value: null);

            migrationBuilder.UpdateData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 2,
                column: "ManagerRemarks",
                value: null);

            migrationBuilder.UpdateData(
                table: "Overtimes",
                keyColumn: "Id",
                keyValue: 3,
                column: "ManagerRemarks",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManagerRemarks",
                table: "Overtimes");

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(2907), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(2909) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4411), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4414) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4744), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4745) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4748), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(4749) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(5932), new DateTime(2023, 5, 23, 15, 48, 37, 472, DateTimeKind.Local).AddTicks(5936) });
        }
    }
}
