using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TimeEntryMutation
    {
        private readonly TimeSheetService _timeSheetService;
        public TimeEntryMutation(TimeSheetService timeSheetService)
        {
            _timeSheetService = timeSheetService;
        }
        public async Task<string> UpdateOneTimeEntry(UpdateTimeEntry updatedTimeEntry)
        {
            return await _timeSheetService.UpdateOneTimeEntry(updatedTimeEntry);
        }
    }
}
