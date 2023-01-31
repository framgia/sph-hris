using api.Entities;
using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class LeaveMutation
    {
        public async Task<List<Leave>> CreateLeave(CreateLeaveRequest leave, [Service] LeaveService _leaveService)
        {
            return await _leaveService.Create(leave);
        }
    }
}
