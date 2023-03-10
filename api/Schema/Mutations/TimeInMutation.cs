using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TimeInMutation
    {
        private readonly TimeInService _timeInService;
        public TimeInMutation(TimeInService timeInService)
        {
            _timeInService = timeInService;
        }
        public async Task<string> UpdateTimeIn(TimeInRequest timeIn)
        {
            return await _timeInService.Update(timeIn);
        }
    }
}
