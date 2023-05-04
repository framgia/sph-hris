using api.Context;
using api.Middlewares.Attributes;
using api.Requests;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class EmployeeScheduleMutation
    {
        [AdminUser]
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

        [AdminUser]
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
                throw;
            }
        }

        [AdminUser]
        public async Task<string> AddMembersToSchedule([Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeScheduleService _employeeSchedueleService, AddMemberToScheduleRequest request)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var addMemberToSchedule = await _employeeSchedueleService.AddMembersToSchedule(request, context);

                transaction.Commit();
                return addMemberToSchedule;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        [AdminUser]
        public async Task<string> UpdateMemberSchedule([Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeScheduleService _employeeSchedueleService, UpdateMemberScheduleRequest request)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var updatedEmployeeSchedule = await _employeeSchedueleService.UpdateMemberSchedule(request, context);

                transaction.Commit();
                return updatedEmployeeSchedule;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        [AdminUser]
        public async Task<string> DeleteEmployeeSchedule([Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeScheduleService _employeeSchedueleService, DeleteEmployeeScheduleRequest request)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var deletedEmployeeSchedule = await _employeeSchedueleService.Delete(request, context);

                transaction.Commit();
                return deletedEmployeeSchedule;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }
    }
}
