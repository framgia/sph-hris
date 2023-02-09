using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserSeederAndAvatar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfileImageId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Medias",
                columns: new[] { "Id", "CollectionName", "CreatedAt", "FileName", "MimeType", "Name", "TimeId", "UpdatedAt" },
                values: new object[] { 1, "avatar", new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "default.png", "image/png", "defaultAvatar", null, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "Name", "ProfileImageId", "RoleId" },
                values: new object[] { "abduljalil.palala@sun-asterisk.com", "Abdul Jalil Palala", 1, 3 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "Name", "ProfileImageId", "RoleId" },
                values: new object[] { "alvil.balbuena@sun-asterisk.com", "Alvil Balbuena", 1, 3 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "EmployeeScheduleId", "IsOnline", "Name", "PaidLeaves", "ProfileImageId", "RoleId", "UpdatedAt" },
                values: new object[,]
                {
                    { 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "nicoleamber.mariscal@sun-asterisk.com", 1, false, "Nicole Amber Mariscal", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 4, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ardendave.cabotaje@sun-asterisk.com", 1, false, "Arden Dave Cabotaje", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 5, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "brucenigel.vilo@sun-asterisk.com", 1, false, "Bruce Nigel Vilo", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 6, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "charlotte.sacmar@sun-asterisk.com", 1, false, "Charlotte Sacmar", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 7, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "chevy.banico@sun-asterisk.com", 1, false, "Chevy Banico", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 8, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "daisuke.nishide@sun-asterisk.com", 1, false, "Daisuke Nishide", 0f, 1, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 9, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "derick.bulawan@sun-asterisk.com", 1, false, "Derick Bulawan", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 10, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "dether.dacuma@sun-asterisk.com", 1, false, "Dether Dacuma", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 11, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "dexterlouie.aniez@sun-asterisk.com", 1, false, "Dexter Louie Aniez", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 12, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "efren.catedrilla@sun-asterisk.com", 1, false, "Efren Catedrilla II", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 13, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "egie.garciano@sun-asterisk.com", 1, false, "Egie Garciano", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 14, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "elainegrace.jalipa@sun-asterisk.com", 1, false, "Elaine Grace Jalipa", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 15, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "elyric.manatad@sun-asterisk.com", 1, false, "Elyric Manatad", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 16, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "fionakathryn.nono@sun-asterisk.com", 1, false, "Fiona Kathryn Nono", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 17, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "francis.delossantos@sun-asterisk.com", 1, false, "Francis Delos Santos", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 18, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "fumihito.umekita@sun-asterisk.com", 1, false, "Fumihito Umekita", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 19, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "gabrielhansley.suarez@sun-asterisk.com", 1, false, "Gabriel Hansley Suarez", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 20, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "geneno.sampayan@sun-asterisk.com", 1, false, "Sampayan Geneno", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 21, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "genrevel.manreal@sun-asterisk.com", 1, false, "Genrevel Manreal", 0f, 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 22, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "preciousgift.canovas@sun-asterisk.com", 1, false, "Gift Canovas", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 23, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "marygoldie.satinitigan@sun-asterisk.com", 1, false, "Mary Goldie Satinitigan", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 24, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ianmichael.urriza@sun-asterisk.com", 1, false, "Ian Michael Urriza", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 25, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "inahmarie.sanjuan@sun-asterisk.com", 1, false, "Inah Marie San Juan", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 26, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "janzen.guzman@sun-asterisk.com", 1, false, "Janzen Guzman", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 27, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jasonclyde.chua@sun-asterisk.com", 1, false, "Jason Clyde Chua", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 28, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jennifer.chan@sun-asterisk.com", 1, false, "Jennifer Chan", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 29, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jeraldjoshua.echavia@sun-asterisk.com", 1, false, "Jerald Joshua Echavia", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 30, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jeremiah.caballero@sun-asterisk.com", 1, false, "Jeremiah Caballero", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 31, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "marcjermaine.pontiveros@sun-asterisk.com", 1, false, "Marc Jermaine Pontiveros", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 32, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jesamae.obcial@sun-asterisk.com", 1, false, "Jesamae Obcial", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 33, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jhoannadianne.ardiente@sun-asterisk.com", 1, false, "Jhoanna Dianne Ardiente", 0f, 1, 2, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 34, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jhonrhon.escabillas@sun-asterisk.com", 1, false, "Jhon Rhon Escabillas", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 35, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "jieno.pepito@sun-asterisk.com", 1, false, "Jieno Pepito", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 36, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "joash.canete@sun-asterisk.com", 1, false, "Joash Cañete", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 37, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "johnpaul.banera@sun-asterisk.com", 1, false, "John Paul Banera", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 38, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "johnharvey.catampongan@sun-asterisk.com", 1, false, "John Harvey Catampongan", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 39, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "johnroy.cabezas@sun-asterisk.com", 1, false, "John Roy Cabezas", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 40, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "johnstephen.degillo@sun-asterisk.com", 1, false, "John Stephen Degillo", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 41, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "josegabriel.javier@sun-asterisk.com", 1, false, "Jose Gabriel Javier", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 42, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "josephroqueisidro.navares@sun-asterisk.com", 1, false, "Joseph Roque Isidro Navares", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 43, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "joshua.escarilla@sun-asterisk.com", 1, false, "Joshua Escarilla", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 44, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "joshua.galit@sun-asterisk.com", 1, false, "Joshua Galit", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 45, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "julesrussel.lucero@sun-asterisk.com", 1, false, "Jules Russel Lucero", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 46, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "karloandre.lee@sun-asterisk.com", 1, false, "Karlo Andre Lee", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 47, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "kenorenz.bacunawa@sun-asterisk.com", 1, false, "Keno Renz Bacunawa", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 48, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "kentnino.ipili@sun-asterisk.com", 1, false, "Kent Niño Ipili", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 49, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "kurt.dacudag@sun-asterisk.com", 1, false, "Kurt Dacudag", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 50, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "lemar.escomo@sun-asterisk.com", 1, false, "Lemar Escomo", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 51, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "louisegwen.pujante@sun-asterisk.com", 1, false, "Louise Gwen Pujante", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 52, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "markjason.delima@sun-asterisk.com", 1, false, "Mark Jason Delima", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 53, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "melanthony.ando@sun-asterisk.com", 1, false, "Mel Anthony Ando", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 54, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "michael.silverio@sun-asterisk.com", 1, false, "Michael Silverio", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 55, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "neilmar.laurente@sun-asterisk.com", 1, false, "Neilmar Laurente", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 56, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "kylenikka.lizardo@sun-asterisk.com", 1, false, "Kyle Nikka Lizardo", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 57, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "nilo.castillano@sun-asterisk.com", 1, false, "Nilo Castillano Jr", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 58, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "paulerick.doroy@sun-asterisk.com", 1, false, "Paul Erick Doroy", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 59, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ejanton.potot@sun-asterisk.com", 1, false, "EJ Anton Potot", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 60, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "mariaysabellaradgelouise.lucero@sun-asterisk.com", 1, false, "Maria Ysabella Radge Louise Lucero", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 61, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "redempto.legaspi@sun-asterisk.com", 1, false, "Redempto Dagoc Legaspi III", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 62, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "reneangelo.gunayon@sun-asterisk.com", 1, false, "Rene Angelo Gunayon", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 63, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "richelle.isla@sun-asterisk.com", 1, false, "Richelle Isla", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 64, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "rj.fajardo@sun-asterisk.com", 1, false, "RJ Fajardo", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 65, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "roberto.delrosario@sun-asterisk.com", 1, false, "Roberto Del Rosario", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 66, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "rogeliojohn.oliverio@sun-asterisk.com", 1, false, "Rogelio John Oliverio", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 67, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "roman.duetes@sun-asterisk.com", 1, false, "Roman Duetes", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 68, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "rose.augusto@sun-asterisk.com", 1, false, "Rose Augusto", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 69, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ryanjasper.macapobre@sun-asterisk.com", 1, false, "Ryan Jasper Macapobre", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 70, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ryan.dupay@sun-asterisk.com", 1, false, "Ryan Dupay", 0f, 1, 1, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 71, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "sheena.belino@sun-asterisk.com", 1, false, "Sheena Belino", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 72, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "soki.terai@sun-asterisk.com", 1, false, "Souki Terai", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 73, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "sonrhey.deiparine@sun-asterisk.com", 1, false, "Son Rhey Deiparine", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 74, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "christan.shane.plaza@sun-asterisk.com", 1, false, "Christan Plaza", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 75, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "marytherese.alegre@sun-asterisk.com", 1, false, "Mary Therese Alegre", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 76, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "trishamarie.villasencio@sun-asterisk.com", 1, false, "Trisha Marie Villasencio", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 77, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "ruziboev.vali@sun-asterisk.com", 1, false, "Vali Ruziboev", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 78, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "wylenjoan.lee@sun-asterisk.com", 1, false, "Wylen Joan Lee", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) },
                    { 79, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827), "zionkeenen.tavera@sun-asterisk.com", 1, false, "Zion Keenen Tavera", 0f, 1, 3, new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfileImageId",
                table: "Users",
                column: "ProfileImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Medias_ProfileImageId",
                table: "Users",
                column: "ProfileImageId",
                principalTable: "Medias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Medias_ProfileImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ProfileImageId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "Medias",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "ProfileImageId",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "Name", "RoleId" },
                values: new object[] { "johndoe@sun-asterisk.com", "John Doe", 2 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "Name", "RoleId" },
                values: new object[] { "reanschwarzer@sun-asterisk.com", "Rean Schwarzer", 1 });
        }
    }
}
