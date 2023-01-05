using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TimeOutMutation
    {
        private readonly TimeOutService _timeOutService;
        public TimeOutMutation(TimeOutService timeOutService)
        {
            _timeOutService = timeOutService;
        }
        public async Task<string> UpdateTimeEntry(TimeOutRequest timeOut)
        {
            return await _timeOutService.Update(timeOut);
        }
    }
}
