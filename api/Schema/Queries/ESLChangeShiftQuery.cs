using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class ESLChangeShiftQuery
    {
        private readonly ESLChangeShiftService _eslChangeShiftService;
        public ESLChangeShiftQuery(ESLChangeShiftService eslChangeShiftService)
        {
            _eslChangeShiftService = eslChangeShiftService;
        }

        public async Task<ESLChangeShiftRequest> GetESLChangeShiftByTimeEntry(int timeEntryId)
        {
            return await _eslChangeShiftService.GetTimeEntryChangeShift(timeEntryId);
        }
    }
}
