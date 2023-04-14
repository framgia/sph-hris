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

        public async Task<List<ESLOffsetDTO>> GetESLOffsetsByTimeEntry(int timeEntryId, bool onlyUnused = false)
        {
            return await _eslOffsetService.GetTimeEntryOffsets(timeEntryId, onlyUnused);
        }

        public async Task<List<ESLOffsetDTO>> GetAllESLOffsets(bool? isUsed = null)
        {
            return await _eslOffsetService.GetAllESLOffsets(isUsed);
        }
    }
}
