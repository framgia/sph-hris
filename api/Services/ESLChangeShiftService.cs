using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class ESLChangeShiftService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly CustomInputValidation _customInputValidation;

        public ESLChangeShiftService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
        }

        public async Task<ESLChangeShiftRequest> Create(CreateESLChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                // validate inputs
                var errors = _customInputValidation.checkESLChangeShiftRequestInput(request);

                if (errors.Count > 0) throw new GraphQLException(errors);

                // Get all offsets to be used
                var offsets = await context.ESLOffsets.Where(x => request.ESLOffsetIDs.Contains(x.Id)).ToListAsync();

                offsets.ForEach(offset =>
                {
                    offset.IsUsed = true;
                });

                //  Create ESLChangeShiftRequest
                var eslChangeShiftRequest = new ESLChangeShiftRequest
                {
                    UserId = request.UserId,
                    TeamLeaderId = request.TeamLeaderId,
                    TimeEntryId = request.TimeEntryId,
                    TimeIn = TimeSpan.ParseExact(request.TimeIn, "hh':'mm", null),
                    TimeOut = TimeSpan.ParseExact(request.TimeOut, "hh':'mm", null),
                    Description = request.Description,
                    ESLOffsets = offsets
                };

                context.ESLChangeShiftRequests.Add(eslChangeShiftRequest);
                await context.SaveChangesAsync();
                return eslChangeShiftRequest;
            }
        }

        public async Task<ESLChangeShiftRequest> GetTimeEntryChangeShift(int timeEntryId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var eslChangeShiftRequest = await context.ESLChangeShiftRequests
                    .Include(x => x.TeamLeader)
                    .Where(x => x.TimeEntryId == timeEntryId)
                    .FirstAsync();

                return eslChangeShiftRequest;
            }
        }

        public string GetRequestStatus(ESLChangeShiftRequest request)
        {
            if (request.IsLeaderApproved == true) return RequestStatus.APPROVED;
            if (request.IsLeaderApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }

        public string GetOffsetRequestStatus(ESLOffset request)
        {
            if (request.IsLeaderApproved == true) return RequestStatus.APPROVED;
            if (request.IsLeaderApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }
    }
}
