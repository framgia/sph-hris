using api.Context;
using api.Enums;
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
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_SHCEDULE_CREATION)
                                    .Build());
            }
        }

        public async Task<string> UpdateEmployeeSchedule([Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeScheduleService _employeeSchedueleService, UpdateEmployeeScheduleRequest request)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var updatedEmployeeSchedule = await _employeeSchedueleService.Update(request, context);

                transaction.Commit();
                return updatedEmployeeSchedule;
            }
            catch (GraphQLException)
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_SHCEDULE_UPDATE)
                                    .Build());
            }
        }
    }
}
