using api.DTOs;
using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class InterruptionMutation
    {
        private readonly InterruptionService _interruptionService;
        public InterruptionMutation(InterruptionService interruptionService)
        {
            _interruptionService = interruptionService;
        }
        public async Task<WorkInterruptionDTO> CreateWorkInterruption(CreateInterruptionRequest interruption)
        {
            return await _interruptionService.Create(interruption);
        }

    }
}
