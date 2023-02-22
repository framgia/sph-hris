using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyNotificationDiscriminator : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.UpdateData(
                table: "LeaveProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(7684), new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(7685) });

            migrationBuilder.InsertData(
                table: "Notifications",
                columns: new[] { "Id", "CreatedAt", "Data", "Discriminator", "IsRead", "LeaveId", "ReadAt", "RecipientId", "Type", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(9699), "Some JSON Data", "LeaveNotification", false, 1, null, 70, "leave", new DateTime(2023, 2, 22, 13, 42, 11, 196, DateTimeKind.Local).AddTicks(9701) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Notifications");

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

            migrationBuilder.UpdateData(
                table: "LeaveProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 2, 17, 15, 54, 59, 441, DateTimeKind.Local).AddTicks(8844), new DateTime(2023, 2, 17, 15, 54, 59, 441, DateTimeKind.Local).AddTicks(8851) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 2, 17, 15, 54, 59, 442, DateTimeKind.Local).AddTicks(4733), new DateTime(2023, 2, 17, 15, 54, 59, 442, DateTimeKind.Local).AddTicks(4742) });
        }
    }
}
