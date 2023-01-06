using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class UserQuery
    {
        private readonly TimeInService _timeInService;
        public UserQuery(TimeInService timeInService)
        {
            _timeInService = timeInService;
        }
        public async Task<User?> GetUserById(int id)
        {
            return await _timeInService.GetById(id);
        }
    }
}
