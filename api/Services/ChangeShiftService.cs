using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class ChangeShiftService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly CustomInputValidation _customInputValidation;

        public ChangeShiftService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
        }

        public async Task<ChangeShiftRequest> Create(CreateChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                // validate inputs
                var errors = _customInputValidation.checkChangeShiftRequestInput(request);

                if (errors.Count > 0) throw new GraphQLException(errors);

                // Create MultiProjects
                var multiProjectsList = new List<MultiProject>();
                request.Projects.ForEach(project =>
                {
                    var multiProject = new MultiProject
                    {
                        ProjectId = project.ProjectId,
                        ProjectLeaderId = project.ProjectLeaderId,
                        Type = MultiProjectTypeEnum.CHANGE_SHIFT
                    };
                    multiProjectsList.Add(context.MultiProjects.Add(multiProject).Entity);
                });

                //  Create ChangeShiftRequest
                var changeShiftRequest = new ChangeShiftRequest
                {
                    UserId = request.UserId,
                    ManagerId = request.ManagerId,
                    TimeEntryId = request.TimeEntryId,
                    TimeIn = TimeSpan.ParseExact(request.TimeIn, "hh':'mm", null),
                    TimeOut = TimeSpan.ParseExact(request.TimeOut, "hh':'mm", null),
                    OtherProject = request.OtherProject,
                    Description = request.Description,
                    MultiProjects = multiProjectsList
                };

                context.ChangeShiftRequests.Add(changeShiftRequest);
                await context.SaveChangesAsync();
                return changeShiftRequest;
            }
        }

        public string GetRequestStatus(ChangeShiftRequest request)
        {
            if (request.IsLeaderApproved == true && request.IsManagerApproved == true) return RequestStatus.APPROVED;
            if (request.IsLeaderApproved == false && request.IsManagerApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }
    }
}
