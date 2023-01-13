using api.Context;
using api.DTOs;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class TimeSheetService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public TimeSheetService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public static TimeEntryDTO ToTimeEntryDTO(TimeEntry timeEntry)
        {
            return new TimeEntryDTO(timeEntry);
        }

        public async Task<List<TimeEntry>?> GetTimeEntriesByEmployeeId(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                    .Where(c => c.UserId == id)
                    .ToListAsync();
            }
        }

        public async Task<TimeEntry?> GetById(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.TimeEntries
                    .Include(entity => entity.TimeIn)
                    .Select(x => ToTimeEntryDTO(x))
                    .FirstOrDefaultAsync(c => c.UserId == id);
            }
        }

        public async Task<List<TimeEntryDTO>> GetAll()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                List<TimeEntryDTO> entries = await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                    .Select(x => ToTimeEntryDTO(x))
                    .ToListAsync();

                return entries;
            }
        }
    }

}
