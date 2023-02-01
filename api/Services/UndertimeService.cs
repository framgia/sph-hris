using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class UndertimeService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public UndertimeService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<Undertime> Create(CreateLeaveRequest leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                TimeSpan To = TimeSpan.Parse(leave.To ?? "0");
                TimeSpan From = TimeSpan.Parse(leave.From ?? "0");
                if (leave.LeaveTypeId == LeaveTypeEnum.UNDERTIME)
                {
                    if (TimeSpan.Compare(To.Subtract(From), new TimeSpan(3, 0, 0)) != 1)
                    {
                        Undertime ut = context.Undertimes.Add(new Undertime
                        {
                            UserId = leave.UserId,
                            ProjectId = leave.ProjectId,
                            ManagerId = leave.ManagerId,
                            OtherProject = leave.OtherProject,
                            Reason = leave.Reason,
                            From = From,
                            To = To,
                        }).Entity;
                        await context.SaveChangesAsync();
                        return ut;
                    }
                    throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("Undertime data is invalid")
                    .Build());
                }
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid Leave Type")
                .Build());
            }
        }
    }
}
