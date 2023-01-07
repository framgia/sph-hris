using api.DTOs;
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
        public async Task<UserDTO?> GetUserById(int id, string schedule)
        {
            return await _timeInService.GetByIdSchedule(id, schedule);
        }
    }
}
