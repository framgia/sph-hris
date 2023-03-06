using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class OvertimeTimeEntryRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RequestedMinutes",
                table: "Overtimes",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<int>(
                name: "ApprovedMinutes",
                table: "Overtimes",
                type: "int",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimeEntryId",
                table: "Overtimes",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_Overtimes_TimeEntryId",
                table: "Overtimes",
                column: "TimeEntryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Overtimes_TimeEntries_TimeEntryId",
                table: "Overtimes",
                column: "TimeEntryId",
                principalTable: "TimeEntries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Overtimes_TimeEntries_TimeEntryId",
                table: "Overtimes");

            migrationBuilder.DropIndex(
                name: "IX_Overtimes_TimeEntryId",
                table: "Overtimes");

            migrationBuilder.DropColumn(
                name: "TimeEntryId",
                table: "Overtimes");

            migrationBuilder.AlterColumn<float>(
                name: "RequestedMinutes",
                table: "Overtimes",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<float>(
                name: "ApprovedMinutes",
                table: "Overtimes",
                type: "real",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 2, 12, 2, 51, 2, DateTimeKind.Local).AddTicks(8766), new DateTime(2023, 3, 2, 12, 2, 51, 2, DateTimeKind.Local).AddTicks(8767) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 3, 2, 12, 2, 51, 3, DateTimeKind.Local).AddTicks(295), new DateTime(2023, 3, 2, 12, 2, 51, 3, DateTimeKind.Local).AddTicks(296) });
        }
    }
}
