using api.Entities;
using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class UndertimeMutation
    {
        public async Task<Undertime> CreateUndertime(CreateLeaveRequest leave, [Service] UndertimeService _undertimeService)
        {
            return await _undertimeService.Create(leave);
        }
    }
}
