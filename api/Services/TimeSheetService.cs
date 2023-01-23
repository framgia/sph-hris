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

        public async Task<Time?> GetTimeById(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Times
                    .Include(entry => entry.Media)
                    .FirstOrDefaultAsync(c => c.Id == id);
            }
        }

        public static TimeEntryDTO ToTimeEntryDTO(TimeEntry timeEntry)
        {
            return new TimeEntryDTO(timeEntry);
        }

        public async Task<List<TimeEntryDTO>?> GetTimeEntriesByEmployeeId(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                    .Where(c => c.UserId == id)
                    .Select(x => ToTimeEntryDTO(x))
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

        public async Task<List<TimeEntryDTO>> GetAll(String? date = null, String? status = null)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                List<TimeEntryDTO> entries = await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                    .OrderByDescending(entry => entry.Date)
                    .Select(entry => ToTimeEntryDTO(entry))
                    .ToListAsync();

                if (date != null)
                {
                    var filterDate = from entry in entries
                                     where DateOnly.Parse(date).CompareTo(entry.Date) == 0
                                     select entry;

                    entries = filterDate.ToList();

                }

                if (status != null)
                {
                    var filterStatus = from entry in entries
                                       where entry.Status == status
                                       select entry;

                    entries = filterStatus.ToList();
                }

                return entries;
            }
        }
    }

}
