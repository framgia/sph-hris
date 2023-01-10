using api.Entities;
using api.Entities.DTO;
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

        public async Task<TimeEntry?> GetTimeEntryById(int id)
        {
            return await _timeSheetService.GetById(id);
        }

        public async Task<List<TimeEntryDTO>> GetTimeEntries()
        {
            return await _timeSheetService.GetAll();
        }
    }
}
