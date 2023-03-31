using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class ChangeShiftQuery
    {
        private readonly ChangeShiftService _changeShiftService;
        public ChangeShiftQuery(ChangeShiftService ChangeShiftService)
        {
            _changeShiftService = ChangeShiftService;
        }

        public async Task<ChangeShiftRequest> GetChangeShiftByTimeEntry(int timeEntryId)
        {
            return await _changeShiftService.GetTimeEntryChangeShift(timeEntryId);
        }
    }
}
