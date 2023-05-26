using api.Context;
using api.DTOs;
using api.Entities;
using api.Requests;
using api.Utils;
using LiteX.Storage.Core;
using Microsoft.EntityFrameworkCore;


namespace api.Services
{
    public class TimeInService
    {
        private readonly TimeInServiceInputValidation _customInputValidation;
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly FileUpload _fileUpload;
        private readonly HttpContextService _httpService;
        public TimeInService(IDbContextFactory<HrisContext> contextFactory, ILiteXBlobService blobService, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _fileUpload = new FileUpload(blobService);
            _httpService = new HttpContextService(accessor);
            _customInputValidation = new TimeInServiceInputValidation(_contextFactory);
        }
        public async Task<UserDTO?> GetByIdSchedule(string token, string schedule)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var domain = _httpService.getDomainURL();
                var personal_token = await context.Personal_Access_Tokens.Where(x => x.Token == token).FirstAsync();
                return await context.Users
                    .Include(i => i.Role)
                    .Include(i => i.Position)
                    .Include(i => i.EmployeeSchedule)
                        .ThenInclude(i => i.WorkingDayTimes.Where(p => p.Day == schedule))
                    .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                        .ThenInclude(i => i.TimeIn)
                    .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                        .ThenInclude(i => i.TimeOut)
                    .Include(i => i.ProfileImage)
                    .Include(i => i.Position)
                    .Where(x => x.Id == personal_token.UserId)
                    .Select(x => new UserDTO(x, domain))
                    .FirstAsync();
            }
        }

        public async Task<string> CreateAll()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    string currentDay = DateTime.Now.ToString("dddd").ToLower();

                    var users = await context.Users.Include(x => x.EmployeeSchedule).ThenInclude(x => x.WorkingDayTimes).ToListAsync();
                    users.ForEach(user =>
                    {
                        WorkingDayTime? currentUserSchedule = user.EmployeeSchedule.WorkingDayTimes.Where(x => x.Day?.ToLower() == currentDay).FirstOrDefault();
                        bool isRestDay = currentDay != currentUserSchedule?.Day?.ToLower();

                        context.TimeEntries.Add(new TimeEntry
                        {
                            UserId = user.Id,
                            StartTime = currentUserSchedule != null && !isRestDay ? currentUserSchedule.From : TimeSpan.FromHours(0),
                            EndTime = currentUserSchedule != null && !isRestDay ? currentUserSchedule.To : TimeSpan.FromHours(0),
                            BreakStartTime = currentUserSchedule != null && !isRestDay ? currentUserSchedule.BreakFrom : TimeSpan.FromHours(0),
                            BreakEndTime = currentUserSchedule != null && !isRestDay ? currentUserSchedule.BreakTo : TimeSpan.FromHours(0),
                            Date = DateTime.Now
                        });
                    });
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return "Successful Time In!";
                }
                catch (Exception e)
                {
                    return e.InnerException?.Message ?? "Something went wrong...";
                }
            }
        }
        public async Task<string> Update(TimeInRequest timeIn)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    var timeEntry = await context.TimeEntries
                    .Include(x => x.User)
                    .Where(x => x.UserId == timeIn.UserId && x.Id == timeIn.Id).FirstAsync();
                    var errors = _customInputValidation.checkTimeInRequestInput(timeIn, timeEntry);
                    if (errors.Count > 0) throw new GraphQLException(errors);
                    var files = _fileUpload.UploadBlob(timeIn.files, this.GetType().Name.ToLower());
                    var time = context.Times.Add(new Time
                    {
                        TimeHour = timeIn.TimeHour,
                        Remarks = timeIn.Remarks,
                        Media = files
                    });
                    await context.SaveChangesAsync();

                    string currentDay = DateTime.Now.ToString("dddd").ToLower();
                    var userSchedule = await context.WorkingDayTimes.Where(x => x.EmployeeScheduleId == timeEntry.User.EmployeeScheduleId && x.Day!.ToLower() == currentDay).FirstAsync();

                    timeEntry.TimeInId = time.Entity.Id;
                    timeEntry.StartTime = timeIn.StartTime;
                    timeEntry.EndTime = timeIn.EndTime;
                    timeEntry.BreakStartTime = userSchedule.BreakFrom;
                    timeEntry.BreakEndTime = userSchedule.BreakTo;
                    timeEntry.Date = timeIn.Date;
                    context.TimeEntries.Update(timeEntry);
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return "Successful Time In!";
                }
                catch (GraphQLException e)
                {
                    throw e;
                }
                catch (Exception e)
                {
                    return e.InnerException?.Message ?? "Something went wrong...";
                }
            }
        }
    }

}
