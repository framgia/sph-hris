using api.Context;
using api.DTOs;
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
                        TimeHour = TimeSpan.FromSeconds(Math.Round(DateTime.Now.TimeOfDay.TotalSeconds)),
                        Remarks = timeout.Remarks
                    });

                    await context.SaveChangesAsync();
                    var timeEntry = await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.Overtime)
                    .Include(entry => entry.User)
                        .ThenInclude(x => x.ProfileImage)
                    .Where(x => x.Id == timeout.TimeEntryId)
                    .FirstAsync();

                    timeEntry.TimeOutId = time.Entity.Id;
                    timeEntry.TimeOut = time.Entity;
                    timeEntry.WorkedHours = timeout.WorkedHours;
                    timeEntry.TrackedHours = GetTrackedHours(timeEntry, time.Entity);
                    context.TimeEntries.Update(timeEntry);

                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return "Successful Time Out!";
                }
                catch
                {
                    throw new Exception("Something went wrong...");
                }
            }
        }

        // private methods
        private TimeSpan GetTrackedHours(TimeEntry timeEntry, Time time)
        {
            TimeEntryDTO timeEntryDTO = new TimeEntryDTO(timeEntry, null, "", null, null);
            TimeSpan UndertimeTimeSpan = TimeSpan.FromMinutes(timeEntryDTO.Undertime);
            TimeSpan LateTimeSpan = TimeSpan.FromMinutes(timeEntryDTO.Late);
            TimeSpan ScheduledHours = timeEntry.EndTime - timeEntry.StartTime;

            // check if logged in after work schedule
            if ((ScheduledHours - LateTimeSpan).TotalMinutes < 0) LateTimeSpan = ScheduledHours - UndertimeTimeSpan;

            return ScheduledHours - UndertimeTimeSpan - LateTimeSpan;
        }
    }
}
