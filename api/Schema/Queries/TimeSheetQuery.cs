using api.DTOs;
using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class TimeSheetQuery
    {
        private readonly TimeSheetService _timeSheetService;
        public TimeSheetQuery(TimeSheetService timeSheetService)
        {
            _timeSheetService = timeSheetService;
        }

        public async Task<Time?> GetTimeById(int id)
        {
            return await _timeSheetService.GetTimeById(id);
        }

        public async Task<TimeEntry?> GetSpecificTimeEntryById(int id)
        {
            return await _timeSheetService.GetSpecificTimeEntryById(id);
        }

        public async Task<UserDTO?> GetSpecificUserProfileDetail(int id)
        {
            return await _timeSheetService.GetSpecificUserProfileDetail(id);
        }

        public async Task<List<TimeEntryDTO>?> GetTimeEntriesByEmployeeId(int id)
        {
            return await _timeSheetService.GetTimeEntriesByEmployeeId(id);
        }

        public async Task<List<TimeEntryDTO>> GetTimeEntries(String? date, String? status)
        {
            return await _timeSheetService.GetAll(date, status);
        }

        public async Task<List<TimeEntriesSummaryDTO>> GetTimesheetSummary(String? startDate, String? endDate)
        {
            return await _timeSheetService.GetSummary(startDate, endDate);
        }
    }
}
