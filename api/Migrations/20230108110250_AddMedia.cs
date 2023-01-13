using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CollectionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MimeType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medias_Times_TimeId",
                        column: x => x.TimeId,
                        principalTable: "Times",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 842, DateTimeKind.Local).AddTicks(2441), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(5224) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(7531), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(7532) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(6491), new DateTime(2023, 1, 8, 19, 2, 49, 843, DateTimeKind.Local).AddTicks(6493) });

            migrationBuilder.CreateIndex(
                name: "IX_Medias_TimeId",
                table: "Medias",
                column: "TimeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.UpdateData(
                table: "EmployeeSchedules",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 719, DateTimeKind.Local).AddTicks(7735), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(5081) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7261), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(7262) });

            migrationBuilder.UpdateData(
                table: "WorkingDayTimes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6191), new DateTime(2023, 1, 5, 11, 55, 52, 722, DateTimeKind.Local).AddTicks(6194) });
        }
    }
}
