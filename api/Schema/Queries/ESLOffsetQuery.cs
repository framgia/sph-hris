using api.DTOs;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class ESLOffsetQuery
    {
        private readonly ESLOffsetService _eslOffsetService;
        public ESLOffsetQuery(ESLOffsetService eslOffsetService)
        {
            _eslOffsetService = eslOffsetService;
        }

        public async Task<List<ESLOffsetDTO>> GetESLOffsetsByTimeEntry(int timeEntryId)
        {
            return await _eslOffsetService.GetTimeEntryOffsets(timeEntryId);
        }
    }
}
