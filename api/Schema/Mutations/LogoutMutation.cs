using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class LogoutMutation
    {
        private readonly LogoutService _logOutService;
        public LogoutMutation(LogoutService logOutService)
        {
            _logOutService = logOutService;
        }
        public async Task<string> Logout(LogoutRequest logOut)
        {
            return await _logOutService.Logout(logOut);
        }
    }
}
