using api.Context;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class TimeOutService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public TimeOutService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<string> Update(TimeOutRequest timeout)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    var time = context.Times.Add(new Time
                    {
                        TimeHour = timeout.TimeHour,
                        Remarks = timeout.Remarks
                    });

                    await context.SaveChangesAsync();
                    var timeEntry = await context.TimeEntries
                    .Include(i => i.TimeIn)
                    .Where(x => x.Id == timeout.TimeEntryId)
                    .FirstAsync();
                    timeEntry.TimeOutId = time.Entity.Id;
                    timeEntry.WorkedHours = time.Entity.TimeHour.Subtract(timeEntry.TimeIn?.TimeHour ?? DateTime.Now.TimeOfDay);
                    timeEntry.TrackedHours = timeEntry.EndTime.Subtract(timeEntry.StartTime);
                    context.TimeEntries.Update(timeEntry);
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return "Successful Time Out!";
                }
                catch (Exception e)
                {
                    return e.InnerException?.Message ?? "Something went wrong...";
                }
            }
        }
    }
}
