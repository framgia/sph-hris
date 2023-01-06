using api.Context;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class TimeInService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public TimeInService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<User?> GetById(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Users
                    .Include(i => i.TimeEntries)
                        .ThenInclude(i => i.TimeIn)
                    .Include(i => i.TimeEntries)
                        .ThenInclude(i => i.TimeOut)
                    .FirstOrDefaultAsync(c => c.Id == id);
            }
        }
        public async Task<string> Create(TimeInRequest timeIn)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    var time = context.Times.Add(new Time
                    {
                        TimeHour = timeIn.TimeHour,
                        Remarks = timeIn.Remarks
                    });
                    await context.SaveChangesAsync();

                    context.TimeEntries.Add(new TimeEntry
                    {
                        UserId = timeIn.UserId,
                        TimeInId = time.Entity.Id,
                        StartTime = timeIn.StartTime,
                        EndTime = timeIn.EndTime,
                        Date = timeIn.Date
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
    }

}
