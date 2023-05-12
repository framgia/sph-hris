using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserProjectPositionSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Medias",
                columns: new[] { "Id", "CollectionName", "CreatedAt", "FileName", "MimeType", "Name", "TimeId", "UpdatedAt" },
                values: new object[] { 80, "avatar", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "default.png", "image/png", "defaultAvatar", null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

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

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 6, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Web Developer - Trainer", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 7, new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Web Developer - Team Leader", new DateTime(2023, 3, 20, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 21, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 6, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 72, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 74, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 25, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 30, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 70, null });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 68, null });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "CreatedAt", "Name", "ProjectLeaderId", "ProjectSubLeaderId", "UpdatedAt" },
                values: new object[,]
                {
                    { 18, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "MeetsOne", 30, null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 19, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Study Gear", 30, null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 20, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Spacee", 30, null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 21, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "Zeon", 30, null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 16,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 17,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 18,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 19,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 20,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 21,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 22,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 23,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 24,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 26,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 27,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 28,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 29,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 31,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 32,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 33,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 34,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 35,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 36,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 37,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 38,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 39,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 40,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 41,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 42,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 43,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 44,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 45,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 46,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 47,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 48,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 49,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 50,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 51,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 52,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 53,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 54,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 55,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 56,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 57,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 58,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 59,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 60,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 61,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 62,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 63,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 64,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 65,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 66,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 67,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 69,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 70,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 71,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 73,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 74,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 75,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 76,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 77,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 78,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 79,
                column: "PaidLeaves",
                value: 12f);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "EmployeeScheduleId", "IsOnline", "Name", "PaidLeaves", "PositionId", "ProfileImageId", "RoleId", "UpdatedAt" },
                values: new object[] { 80, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "quennie.andeza@sun-asterisk.com", 1, false, "Quennie Andeza", 12f, 3, 80, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "Medias",
                keyColumn: "Id",
                keyValue: 80);

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(2533), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(2534) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4079), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4081) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4386), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4387) });

            migrationBuilder.UpdateData(
                table: "MultiProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4390), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(4391) });

            migrationBuilder.UpdateData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(5604), new DateTime(2023, 5, 11, 10, 0, 58, 210, DateTimeKind.Local).AddTicks(5606) });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 2, 1 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "ProjectLeaderId", "ProjectSubLeaderId" },
                values: new object[] { 1, 1 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 16,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 17,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 18,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 19,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 20,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 21,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 22,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 23,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 24,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 26,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 27,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 28,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 29,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 31,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 32,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 33,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 34,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 35,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 36,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 37,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 38,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 39,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 40,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 41,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 42,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 43,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 44,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 45,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 46,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 47,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 48,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 49,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 50,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 51,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 52,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 53,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 54,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 55,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 56,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 57,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 58,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 59,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 60,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 61,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 62,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 63,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 64,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 65,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 66,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 67,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 69,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 70,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 71,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 73,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 74,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 75,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 76,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 77,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 78,
                column: "PaidLeaves",
                value: 0f);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 79,
                column: "PaidLeaves",
                value: 0f);
        }
    }
}
