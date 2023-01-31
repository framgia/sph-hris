using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class LeaveService
    {

        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public LeaveService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<List<Leave>> Create(CreateLeaveRequest leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = new List<Leave>();
                if (leave.LeaveTypeId != LeaveTypeEnum.UNDERTIME)
                {
                    leave.LeaveDates?.ForEach(date =>
                    {
                        leaves.Add(context.Leaves.Add(new Leave
                        {
                            UserId = leave.UserId,
                            ProjectId = leave.ProjectId,
                            LeaveTypeId = leave.LeaveTypeId,
                            ManagerId = leave.ManagerId,
                            OtherProject = leave.OtherProject,
                            Reason = leave.Reason,
                            LeaveDate = DateTime.Parse(date),
                            IsWithPay = leave.IsWithPay,
                        }).Entity);
                    });
                    await context.SaveChangesAsync();
                    return leaves;
                }
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid Leave Type")
                .Build());
            }
        }
    }
}
