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
        public UserDTO? GetUserById()
        {
            return _userService.GetLoggedInUser();
        }
        public async Task<List<User>> GetAllUsers([Service] UserService _userService)
        {
            return await _userService.Index();
        }

        public async Task<List<User>> GetAllESLUsers([Service] UserService _userService, int? exceptUserId = null)
        {
            return await _userService.ESLUsers(exceptUserId);
        }

        public async Task<List<Position>> GetAllPositions()
        {
            return await _userService.GetAllPositions();
        }

        public async Task<List<Role>> GetAllRoles()
        {
            return await _userService.GetAllRoles();
        }
    }
}
