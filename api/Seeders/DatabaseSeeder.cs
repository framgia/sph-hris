using api.Entities;
using api.Enums;

namespace api.Seeders
{
    public static class DatabaseSeeder
    {
        public static Media media = new Media
        {
            Id = 1,
            CollectionName = "avatar",
            Name = "defaultAvatar",
            FileName = "default.png",
            MimeType = "image/png",
            CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
            UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
        };
        public static EmployeeSchedule employeeSchedule = new EmployeeSchedule
        {
            Id = 1,
            Name = "Morning Shift",
            CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
            UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
        };
        public static List<WorkingDayTime> workingDayTime = new List<WorkingDayTime>(){
            new WorkingDayTime {
                Id = 1,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Monday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 2,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Tuesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 3,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Wednesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 4,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Thursday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 5,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Friday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<WorkInterruptionType> workInterruptionType = new List<WorkInterruptionType>(){
            new WorkInterruptionType {
                Id = 1,
                Name = WorkInterruptionEnum.POWER_INTERRUPTION,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 2,
                Name = WorkInterruptionEnum.LOST_INTERNET_CONNECTION,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 3,
                Name = WorkInterruptionEnum.EMERGENCY,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 4,
                Name = WorkInterruptionEnum.ERRANDS,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 5,
                Name = WorkInterruptionEnum.OTHERS,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Role> roles = new List<Role>(){
            new Role {
                Id = 1,
                Name = RoleEnum.MANAGER,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Role {
                Id = 2,
                Name = RoleEnum.HR_ADMIN,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Role {
                Id = 3,
                Name = RoleEnum.EMPLOYEE,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            }
        };
        public static User[] users()
        {
            User[] users = {
                new User
                {
                    Id = 1,
                    Name = "Abdul Jalil Palala",
                    Email = "abduljalil.palala@sun-asterisk.com",
                    RoleId = 3,
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 2,
                    Name = "Alvil Balbuena",
                    RoleId = 3,
                    Email = "alvil.balbuena@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 3,
                    Name = "Nicole Amber Mariscal",
                    RoleId = 3,
                    Email = "nicoleamber.mariscal@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 4,
                    Name = "Arden Dave Cabotaje",
                    RoleId = 3,
                    Email = "ardendave.cabotaje@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 5,
                    Name = "Bruce Nigel Vilo",
                    RoleId = 3,
                    Email = "brucenigel.vilo@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 6,
                    Name = "Charlotte Sacmar",
                    RoleId = 3,
                    Email = "charlotte.sacmar@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 7,
                    Name = "Chevy Banico",
                    RoleId = 3,
                    Email = "chevy.banico@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 8,
                    Name = "Daisuke Nishide",
                    RoleId = 1,
                    Email = "daisuke.nishide@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 9,
                    Name = "Derick Bulawan",
                    RoleId = 3,
                    Email = "derick.bulawan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 10,
                    Name = "Dether Dacuma",
                    RoleId = 3,
                    Email = "dether.dacuma@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 11,
                    Name = "Dexter Louie Aniez",
                    RoleId = 3,
                    Email = "dexterlouie.aniez@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 12,
                    Name = "Efren Catedrilla II",
                    RoleId = 3,
                    Email = "efren.catedrilla@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 13,
                    Name = "Egie Garciano",
                    RoleId = 3,
                    Email = "egie.garciano@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 14,
                    Name = "Elaine Grace Jalipa",
                    RoleId = 3,
                    Email = "elainegrace.jalipa@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 15,
                    Name = "Elyric Manatad",
                    RoleId = 3,
                    Email = "elyric.manatad@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 16,
                    Name = "Fiona Kathryn Nono",
                    RoleId = 3,
                    Email = "fionakathryn.nono@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 17,
                    Name = "Francis Delos Santos",
                    RoleId = 3,
                    Email = "francis.delossantos@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 18,
                    Name = "Fumihito Umekita",
                    RoleId = 3,
                    Email = "fumihito.umekita@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 19,
                    Name = "Gabriel Hansley Suarez",
                    RoleId = 3,
                    Email = "gabrielhansley.suarez@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 20,
                    Name = "Sampayan Geneno",
                    RoleId = 3,
                    Email = "geneno.sampayan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 21,
                    Name = "Genrevel Manreal",
                    RoleId = 2,
                    Email = "genrevel.manreal@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 22,
                    Name = "Gift Canovas",
                    RoleId = 3,
                    Email = "preciousgift.canovas@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 23,
                    Name = "Mary Goldie Satinitigan",
                    RoleId = 3,
                    Email = "marygoldie.satinitigan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 24,
                    Name = "Ian Michael Urriza",
                    RoleId = 3,
                    Email = "ianmichael.urriza@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 25,
                    Name = "Inah Marie San Juan",
                    RoleId = 3,
                    Email = "inahmarie.sanjuan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 26,
                    Name = "Janzen Guzman",
                    RoleId = 3,
                    Email = "janzen.guzman@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 27,
                    Name = "Jason Clyde Chua",
                    RoleId = 3,
                    Email = "jasonclyde.chua@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 28,
                    Name = "Jennifer Chan",
                    RoleId = 3,
                    Email = "jennifer.chan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 29,
                    Name = "Jerald Joshua Echavia",
                    RoleId = 3,
                    Email = "jeraldjoshua.echavia@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 30,
                    Name = "Jeremiah Caballero",
                    RoleId = 3,
                    Email = "jeremiah.caballero@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 31,
                    Name = "Marc Jermaine Pontiveros",
                    RoleId = 3,
                    Email = "marcjermaine.pontiveros@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 32,
                    Name = "Jesamae Obcial",
                    RoleId = 3,
                    Email = "jesamae.obcial@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 33,
                    Name = "Jhoanna Dianne Ardiente",
                    RoleId = 2,
                    Email = "jhoannadianne.ardiente@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 34,
                    Name = "Jhon Rhon Escabillas",
                    RoleId = 3,
                    Email = "jhonrhon.escabillas@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 35,
                    Name = "Jieno Pepito",
                    RoleId = 3,
                    Email = "jieno.pepito@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 36,
                    Name = "Joash Cañete",
                    RoleId = 3,
                    Email = "joash.canete@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 37,
                    Name = "John Paul Banera",
                    RoleId = 3,
                    Email = "johnpaul.banera@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 38,
                    Name = "John Harvey Catampongan",
                    RoleId = 3,
                    Email = "johnharvey.catampongan@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 39,
                    Name = "John Roy Cabezas",
                    RoleId = 3,
                    Email = "johnroy.cabezas@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 40,
                    Name = "John Stephen Degillo",
                    RoleId = 3,
                    Email = "johnstephen.degillo@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 41,
                    Name = "Jose Gabriel Javier",
                    RoleId = 3,
                    Email = "josegabriel.javier@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 42,
                    Name = "Joseph Roque Isidro Navares",
                    RoleId = 3,
                    Email = "josephroqueisidro.navares@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 43,
                    Name = "Joshua Escarilla",
                    RoleId = 3,
                    Email = "joshua.escarilla@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 44,
                    Name = "Joshua Galit",
                    RoleId = 3,
                    Email = "joshua.galit@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 45,
                    Name = "Jules Russel Lucero",
                    RoleId = 3,
                    Email = "julesrussel.lucero@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 46,
                    Name = "Karlo Andre Lee",
                    RoleId = 3,
                    Email = "karloandre.lee@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 47,
                    Name = "Keno Renz Bacunawa",
                    RoleId = 3,
                    Email = "kenorenz.bacunawa@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 48,
                    Name = "Kent Niño Ipili",
                    RoleId = 3,
                    Email = "kentnino.ipili@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 49,
                    Name = "Kurt Dacudag",
                    RoleId = 3,
                    Email = "kurt.dacudag@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 50,
                    Name = "Lemar Escomo",
                    RoleId = 3,
                    Email = "lemar.escomo@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 51,
                    Name = "Louise Gwen Pujante",
                    RoleId = 3,
                    Email = "louisegwen.pujante@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 52,
                    Name = "Mark Jason Delima",
                    RoleId = 3,
                    Email = "markjason.delima@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 53,
                    Name = "Mel Anthony Ando",
                    RoleId = 3,
                    Email = "melanthony.ando@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 54,
                    Name = "Michael Silverio",
                    RoleId = 3,
                    Email = "michael.silverio@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 55,
                    Name = "Neilmar Laurente",
                    RoleId = 3,
                    Email = "neilmar.laurente@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 56,
                    Name = "Kyle Nikka Lizardo",
                    RoleId = 3,
                    Email = "kylenikka.lizardo@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 57,
                    Name = "Nilo Castillano Jr",
                    RoleId = 3,
                    Email = "nilo.castillano@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 58,
                    Name = "Paul Erick Doroy",
                    RoleId = 3,
                    Email = "paulerick.doroy@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 59,
                    Name = "EJ Anton Potot",
                    RoleId = 3,
                    Email = "ejanton.potot@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 60,
                    Name = "Maria Ysabella Radge Louise Lucero",
                    RoleId = 3,
                    Email = "mariaysabellaradgelouise.lucero@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 61,
                    Name = "Redempto Dagoc Legaspi III",
                    RoleId = 3,
                    Email = "redempto.legaspi@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 62,
                    Name = "Rene Angelo Gunayon",
                    RoleId = 3,
                    Email = "reneangelo.gunayon@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 63,
                    Name = "Richelle Isla",
                    RoleId = 3,
                    Email = "richelle.isla@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 64,
                    Name = "RJ Fajardo",
                    RoleId = 3,
                    Email = "rj.fajardo@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 65,
                    Name = "Roberto Del Rosario",
                    RoleId = 3,
                    Email = "roberto.delrosario@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 66,
                    Name = "Rogelio John Oliverio",
                    RoleId = 3,
                    Email = "rogeliojohn.oliverio@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 67,
                    Name = "Roman Duetes",
                    RoleId = 3,
                    Email = "roman.duetes@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 68,
                    Name = "Rose Augusto",
                    RoleId = 3,
                    Email = "rose.augusto@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 69,
                    Name = "Ryan Jasper Macapobre",
                    RoleId = 3,
                    Email = "ryanjasper.macapobre@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 70,
                    Name = "Ryan Dupay",
                    RoleId = 1,
                    Email = "ryan.dupay@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 71,
                    Name = "Sheena Belino",
                    RoleId = 3,
                    Email = "sheena.belino@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 72,
                    Name = "Souki Terai",
                    RoleId = 3,
                    Email = "soki.terai@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 73,
                    Name = "Son Rhey Deiparine",
                    RoleId = 3,
                    Email = "sonrhey.deiparine@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 74,
                    Name = "Christan Plaza",
                    RoleId = 3,
                    Email = "christan.shane.plaza@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 75,
                    Name = "Mary Therese Alegre",
                    RoleId = 3,
                    Email = "marytherese.alegre@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 76,
                    Name = "Trisha Marie Villasencio",
                    RoleId = 3,
                    Email = "trishamarie.villasencio@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 77,
                    Name = "Vali Ruziboev",
                    RoleId = 3,
                    Email = "ruziboev.vali@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 78,
                    Name = "Wylen Joan Lee",
                    RoleId = 3,
                    Email = "wylenjoan.lee@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },
                new User
                {
                    Id = 79,
                    Name = "Zion Keenen Tavera",
                    RoleId = 3,
                    Email = "zionkeenen.tavera@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    ProfileImageId = media.Id
                },

            };
            return users;
        }

        public static Time[] times()
        {
            Time[] times = {
                new Time
                {
                    Id = 1,
                    TimeHour = new TimeSpan(9, 15, 0),
                    Remarks = "First time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 2,
                    TimeHour = new TimeSpan(9, 15, 0),
                    Remarks = "Second time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 3,
                    TimeHour = new TimeSpan(10, 15, 0),
                    Remarks = "Third time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 4,
                    TimeHour = new TimeSpan(18, 15, 0),
                    Remarks = "First time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 5,
                    TimeHour = new TimeSpan(18, 30, 0),
                    Remarks = "Second time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 6,
                    TimeHour = new TimeSpan(19, 59, 0),
                    Remarks = "Third time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                }
            };
            return times;
        }

        public static TimeEntry[] timeEntries()
        {
            TimeEntry[] entries = {
                new TimeEntry
                {
                    Id = 1,
                    UserId = 1,
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 1,
                    TimeOutId = 4,
                    WorkedHours = times().First(time => time.Id==4).TimeHour.Subtract(times().First(time => time.Id==1)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new TimeEntry
                {
                    Id = 2,
                    UserId = 2,
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 2,
                    TimeOutId = 5,
                    WorkedHours = times().First(time => time.Id==5).TimeHour.Subtract(times().First(time => time.Id==2)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new TimeEntry
                {
                    Id = 3,
                    UserId = 1,
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 3,
                    TimeOutId = 6,
                    WorkedHours = times().First(time => time.Id==6).TimeHour.Subtract(times().First(time => time.Id==3)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
            };
            return entries;
        }
        public static List<LeaveType> leaveTypes = new List<LeaveType>(){
            new LeaveType {
                Id = 1,
                Name = "Sick leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 2,
                Name = "Bereavement leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 3,
                Name = "Emergency leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 4,
                Name = "Vacation leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 5,
                Name = "Maternity/Paternity leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 6,
                Name = "Undertime",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Project> projects = new List<Project>(){
            new Project {
                Id = 1,
                Name = "Admin",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 2,
                Name = "Casec",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 3,
                Name = "Shaperon",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 4,
                Name = "01Booster",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 5,
                Name = "Edge",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 6,
                Name = "DTS",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 7,
                Name = "OJT",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 8,
                Name = "Safie",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 9,
                Name = "AAA Education",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 10,
                Name = "Development Training",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 11,
                Name = "Yamato",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 12,
                Name = "Next Base",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 13,
                Name = "MetaJobs",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 14,
                Name = "Prrrr",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 15,
                Name = "Aironworks",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 16,
                Name = "OsakaMetro",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 17,
                Name = "Others",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Leave> leaves = new List<Leave>(){
            new Leave {
                Id = 1,
                UserId = 1,
                LeaveTypeId = 1,
                ManagerId = 1,
                OtherProject = "None",
                Reason = "Leave lang guds",
                LeaveDate = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                IsWithPay = false,
                IsLeaderApproved = true,
                IsManagerApproved = true,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                Days = 1.5f
            },
            new Leave {
                Id = 2,
                UserId = 2,
                LeaveTypeId = 6,
                ManagerId = 1,
                OtherProject = "None",
                Reason = "Vacation leave",
                LeaveDate = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                IsWithPay = true,
                IsLeaderApproved = true,
                IsManagerApproved = true,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                Days = 2.0f
            },
        };

        public static List<LeaveProject> leaveProjects = new List<LeaveProject>(){
            new LeaveProject {
                Id = 1,
                LeaveId = 1,
                ProjectId = 1,
                ProjectLeaderId = 1
            }
        };

        public static List<LeaveNotification> notifications_leave = new List<LeaveNotification>(){
            new LeaveNotification {
                Id = 1,
                RecipientId = 70,
                Type = NotificationTypeEnum.LEAVE,
                Data = "Some JSON Data",
                LeaveId = 1
            }
        };
    }
}
