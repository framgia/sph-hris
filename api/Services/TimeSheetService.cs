using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class TimeSheetService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;

        public TimeSheetService(IDbContextFactory<HrisContext> contextFactory, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _httpService = new HttpContextService(accessor);
        }

        public async Task<SpecificTimeDTO?> GetTimeById(int id)
        {
            var domain = _httpService.getDomainURL();
            using HrisContext context = _contextFactory.CreateDbContext();
            return await context.Times
                .Include(entry => entry.Media)
                .Where(c => c.Id == id)
                .Select(entry => new SpecificTimeDTO(entry, domain))
                .FirstAsync();
        }

        public static TimeEntryDTO ToTimeEntryDTO(TimeEntry timeEntry, List<Leave> leaves, string domain, List<ChangeShiftRequest>? changeShifts, List<ESLChangeShiftRequest>? eslChangeShifts)
        {
            var leave = leaves.Where(x => DateOnly.FromDateTime(x.LeaveDate) == DateOnly.FromDateTime(timeEntry.Date) && x.UserId == timeEntry.UserId).FirstOrDefault();
            var changeShift = changeShifts?.Where(x => x.TimeEntryId == timeEntry.Id).FirstOrDefault();
            var eslChangeShift = eslChangeShifts?.Where(x => x.TimeEntryId == timeEntry.Id).FirstOrDefault();

            return new TimeEntryDTO(timeEntry, leave, domain, changeShift, eslChangeShift);
        }

        public async Task<List<TimeEntryDTO>?> GetTimeEntriesByEmployeeId(int id)
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = await context.Leaves
                    .Include(leave => leave.LeaveType)
                    .OrderByDescending(leave => leave.LeaveDate)
                    .ToListAsync();

                var eslChangeShift = await context.ESLChangeShiftRequests
                    .Include(x => x.TeamLeader)
                    .ToListAsync();

                var changeShift = await context.ChangeShiftRequests
                    .Include(x => x.Manager)
                    .ToListAsync();

                return await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                        .ThenInclude(x => x.ProfileImage)
                    .Include(entry => entry.Overtime)
                    .Include(x => x.WorkInterruptions)
                    .Where(c => c.UserId == id)
                    .OrderByDescending(entry => entry.Date)
                    .Select(x => ToTimeEntryDTO(x, leaves, domain, changeShift, eslChangeShift))
                    .ToListAsync();
            }
        }

        public async Task<TimeEntry?> GetById(int id)
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = await context.Leaves
                    .Include(leave => leave.LeaveType)
                    .OrderByDescending(leave => leave.LeaveDate)
                    .ToListAsync();

                return await context.TimeEntries
                    .Include(entity => entity.TimeIn)
                    .Include(x => x.WorkInterruptions)
                    .Select(x => ToTimeEntryDTO(x, leaves, domain, null, null))
                    .FirstOrDefaultAsync(c => c.UserId == id);
            }
        }

        public async Task<TimeEntry?> GetSpecificTimeEntryById(int id)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            return await context.TimeEntries
                .Include(entity => entity.User)
                .FirstOrDefaultAsync(c => c.TimeInId == id || c.TimeOutId == id);
        }

        public async Task<UserDTO?> GetSpecificUserProfileDetail(int id)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var domain = _httpService.getDomainURL();
            return await context.Users
            .Include(i => i.Role)
                .Include(i => i.EmployeeSchedule)
                .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                    .ThenInclude(i => i.TimeIn)
                .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                    .ThenInclude(i => i.TimeOut)
                .Include(i => i.ProfileImage)
                .Where(x => x.Id == id)
            .Select(x => new UserDTO(x, domain))
                .FirstAsync();
        }

        public async Task<List<TimeEntryDTO>> GetAll(String? date = null, String? status = null)
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = await context.Leaves
                    .Include(leave => leave.LeaveType)
                    .OrderByDescending(leave => leave.LeaveDate)
                    .ToListAsync();

                List<TimeEntryDTO> entries = await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                        .ThenInclude(x => x.ProfileImage)
                    .Include(entry => entry.Overtime)
                    .Include(entry => entry.WorkInterruptions)
                    .OrderByDescending(entry => entry.Date)
                    .Select(entry => ToTimeEntryDTO(entry, leaves, domain, null, null))
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

        public async Task<List<TimeEntriesSummaryDTO>> GetSummary(String? startDate, String? endDate)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var domain = _httpService.getDomainURL();
                List<TimeEntriesSummaryDTO> summaries = new List<TimeEntriesSummaryDTO>();

                var leaves = await context.Leaves
                    .Include(leave => leave.LeaveType)
                    .OrderByDescending(leave => leave.LeaveDate)
                    .ToListAsync();

                var entries = await context.TimeEntries
                    .Include(entry => entry.TimeIn)
                    .Include(entry => entry.TimeOut)
                    .Include(entry => entry.User)
                        .ThenInclude(x => x.ProfileImage)
                    .Include(entry => entry.Overtime)
                    .Include(entry => entry.WorkInterruptions)
                    .OrderByDescending(entry => entry.Date)
                    .Select(entry => ToTimeEntryDTO(entry, leaves, domain, null, null))
                    .ToListAsync();

                if (startDate != null && endDate != null)
                {

                    var filterDateRange = from entry in entries
                                          where DateOnly.Parse(startDate).CompareTo(entry.Date) <= 0
                                          where DateOnly.Parse(endDate).CompareTo(entry.Date) >= 0
                                          select entry;


                    var filterLeaveDateRange = from leave in leaves
                                               where DateOnly.Parse(startDate).CompareTo(DateOnly.FromDateTime(leave.LeaveDate)) <= 0
                                               where DateOnly.Parse(endDate).CompareTo(DateOnly.FromDateTime(leave.LeaveDate)) >= 0
                                               select leave;

                    entries = filterDateRange.ToList();
                    leaves = filterLeaveDateRange.ToList();
                }

                var grouped = entries.OrderBy(entry => entry.UserId)
                              .GroupBy(entry => entry.UserId);

                foreach (var group in grouped)
                {
                    var userSummary = new TimeEntriesSummaryDTO(group.First());
                    summaries.Add(userSummary);
                    foreach (var timeEntry in group)
                    {
                        // Need more clarification
                        var leave = leaves.Where(x => DateOnly.FromDateTime(x.LeaveDate) == timeEntry.Date && x.UserId == timeEntry.UserId && x.IsLeaderApproved != null && x.IsManagerApproved != null && x.IsLeaderApproved == true && x.IsManagerApproved == true).FirstOrDefault();

                        if (timeEntry.Status.ToLower() == WorkStatusEnum.ABSENT)
                        {
                            userSummary.AddAbsences();
                        }

                        if (leave != null)
                        {
                            userSummary.AddLeave(leave.Days);
                        }

                        userSummary.AddLate(timeEntry.Late);
                        userSummary.AddUndertime(timeEntry.Undertime);
                        if (timeEntry.Overtime?.ApprovedMinutes != null) userSummary.AddOvertime((int)timeEntry.Overtime.ApprovedMinutes);
                    }
                };

                return summaries;
            }
        }

        public async Task<string> UpdateOneTimeEntry(UpdateTimeEntry updatedTimeEntry)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.SingleOrDefault(user => user.Id == updatedTimeEntry.UserId);
                if (user == null || user.RoleId != 2) throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Operation not allowed for this user")
                .Build());

                var currentTimeEntry = context.TimeEntries
                    .SingleOrDefault(entry => entry.Id == updatedTimeEntry.TimeEntryId);

                if (currentTimeEntry != null)
                {
                    if (updatedTimeEntry.TimeIn != null)
                    {
                        if (currentTimeEntry.TimeInId != null)
                        {
                            Time currentTimeIn = context.Times.Single(time => time.Id == currentTimeEntry.TimeInId);
                            currentTimeIn.TimeHour = TimeSpan.Parse(updatedTimeEntry.TimeIn);
                        }
                        else
                        {
                            Time newTime = new Time
                            {
                                TimeHour = TimeSpan.Parse(updatedTimeEntry.TimeIn)
                            };
                            context.Times.Add(newTime);
                            await context.SaveChangesAsync();
                            currentTimeEntry.TimeInId = newTime.Id;
                        }
                    }

                    if (updatedTimeEntry.TimeOut != null)
                    {
                        if (currentTimeEntry.TimeOutId != null)
                        {
                            Time currentTimeOut = context.Times.Single(time => time.Id == currentTimeEntry.TimeOutId);
                            currentTimeOut.TimeHour = TimeSpan.Parse(updatedTimeEntry.TimeOut);
                        }
                        else
                        {
                            Time newTime = new Time
                            {
                                TimeHour = TimeSpan.Parse(updatedTimeEntry.TimeOut)
                            };
                            context.Times.Add(newTime);
                            await context.SaveChangesAsync();
                            currentTimeEntry.TimeOutId = newTime.Id;
                        }
                    }

                    await context.SaveChangesAsync();
                    return "Updated Successfully!";
                }

                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Something went wrong")
                .Build());
            }
        }
    }

}
