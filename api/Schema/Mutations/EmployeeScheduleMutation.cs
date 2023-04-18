using api.Context;
using api.Requests;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class EmployeeScheduleMutation
    {
        public async Task<string> CreateEmployeeSchedule([Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeScheduleService _employeeSchedueleService, CreateEmployeeScheduleRequest request)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var createEmployeeSchedule = await _employeeSchedueleService.Create(request, context);

                transaction.Commit();
                return createEmployeeSchedule;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }
    }
}
