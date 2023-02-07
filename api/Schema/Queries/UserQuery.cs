using api.DTOs;
using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class UserQuery
    {
        private readonly TimeInService _timeInService;
        private readonly UserService _userService;
        public UserQuery(TimeInService timeInService, UserService userService)
        {
            _timeInService = timeInService;
            _userService = userService;
        }
        public async Task<UserDTO?> GetUserById(string token, string schedule)
        {
            return await _timeInService.GetByIdSchedule(token, schedule);
        }
        public async Task<List<User>> GetAllUsers([Service] UserService _userService)
        {
            return await _userService.Index();
        }
    }
}
