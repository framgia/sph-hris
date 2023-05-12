using api.Context;
using api.Middlewares.Attributes;
using api.Requests;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class EmployeeMutation
    {
        [AdminUser]
        public async Task<bool> AddNewEmployee(AddNewEmployeeRequest request, [Service] IDbContextFactory<HrisContext> contextFactory, [Service] EmployeeService _employeeService)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var newEmployee = await _employeeService.AddNew(request, context);

                    transaction.Commit();

                    return true;
                }
                catch (GraphQLException e)
                {
                    throw e;
                }
                catch (Exception e)
                {
                    throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage(e.Message)
                    .Build());
                }
            }
        }
    }
}
