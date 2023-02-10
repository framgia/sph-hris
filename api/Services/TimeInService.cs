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
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly FileUpload _fileUpload;
        private readonly HttpContextService _httpService;
        public TimeInService(IDbContextFactory<HrisContext> contextFactory, ILiteXBlobService blobService, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _fileUpload = new FileUpload(blobService);
            _httpService = new HttpContextService(accessor);
        }
        public async Task<UserDTO?> GetByIdSchedule(string token, string schedule)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var domain = _httpService.getDomainURL();
                var personal_token = await context.Personal_Access_Tokens.Where(x => x.Token == token).FirstAsync();
                return await context.Users
                    .Include(i => i.Role)
                    .Include(i => i.EmployeeSchedule)
                        .ThenInclude(i => i.WorkingDayTimes.Where(p => p.Day == schedule))
                    .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                        .ThenInclude(i => i.TimeIn)
                    .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                        .ThenInclude(i => i.TimeOut)
                    .Include(i => i.ProfileImage)
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
                    var users = await context.Users.ToListAsync();
                    users.ForEach(user =>
                    {
                        context.TimeEntries.Add(new TimeEntry
                        {
                            UserId = user.Id,
                            StartTime = TimeSpan.FromHours(0),
                            EndTime = TimeSpan.FromHours(0),
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
                    var files = _fileUpload.UploadBlob(timeIn.files, this.GetType().Name.ToLower());
                    var time = context.Times.Add(new Time
                    {
                        TimeHour = timeIn.TimeHour,
                        Remarks = timeIn.Remarks,
                        Media = files
                    });
                    await context.SaveChangesAsync();

                    var timeEntry = await context.TimeEntries
                    .Where(x => x.UserId == timeIn.UserId && x.Id == timeIn.Id).FirstAsync();
                    timeEntry.TimeInId = time.Entity.Id;
                    timeEntry.StartTime = timeIn.StartTime;
                    timeEntry.EndTime = timeIn.EndTime;
                    timeEntry.Date = timeIn.Date;
                    context.TimeEntries.Update(timeEntry);
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
    }

}
