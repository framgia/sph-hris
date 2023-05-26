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
        public async Task<string> UpdateTimeOut(TimeOutRequest timeOut)
        {
            try
            {
                return await _timeOutService.Update(timeOut);
            }
            catch (Exception e)
            {
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(e.Message)
                .Build());
            }
        }
    }
}
