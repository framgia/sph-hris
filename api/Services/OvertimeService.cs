using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class OvertimeService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly CustomInputValidation _customInputValidation;

        public OvertimeService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
        }

        public async Task<Overtime> Create(CreateOvertimeRequest overtime)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var errors = _customInputValidation.checkOvertimeRequestInput(overtime);

                if (errors.Count > 0) throw new GraphQLException(errors);

                // Create LeaveProjects
                var overtimeProjectsList = new List<MultiProject>();
                overtime.OvertimeProjects?.ForEach(project =>
                {
                    var projectOvertime = new MultiProject
                    {
                        ProjectId = project.ProjectId,
                        ProjectLeaderId = project.ProjectLeaderId,
                        Type = MultiProjectTypeEnum.OVERTIME
                    };
                    overtimeProjectsList.Add(context.MultiProjects.Add(projectOvertime).Entity);

                });

                // Create Overtime
                var myOvertime = new Overtime
                {
                    UserId = overtime.UserId,
                    ManagerId = overtime.ManagerId,
                    MultiProjects = overtimeProjectsList,
                    OtherProject = overtime.OtherProject,
                    Remarks = overtime.Remarks,
                    OvertimeDate = DateTime.Parse(overtime.Date),
                    RequestedMinutes = overtime.RequestedMinutes
                };
                var newOvertime = context.Overtimes.Add(myOvertime).Entity;
                await context.SaveChangesAsync();
                return newOvertime;
            }
        }

        public string GetOvertimeRequestStatus(Overtime overtime)
        {
            if (overtime.IsLeaderApproved == true && overtime.IsManagerApproved == true) return RequestStatus.APPROVED;
            if (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }
    }
}
