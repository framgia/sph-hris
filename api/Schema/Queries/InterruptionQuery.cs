using api.DTOs;
using api.Requests;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class InterruptionQuery
    {
        private readonly InterruptionService _interruptionService;
        public InterruptionQuery(InterruptionService interruptionService)
        {
            _interruptionService = interruptionService;
        }
        public async Task<List<WorkInterruptionDTO>> GetInterruptionsByTimeEntryId(ShowInterruptionRequest interruption)
        {
            return await _interruptionService.Show(interruption);
        }
    }
}
