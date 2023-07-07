using api.Context;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class EmployeeScheduleServiceInputValidation : CustomInputValidation
    {
        // constructor
        public EmployeeScheduleServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public async Task<List<IError>> checkChangeScheduleRequestInput(ChangeSchedRequest request)
        {
            var errors = new List<IError>();

            foreach (var userId in request.LeaderIds)
            {
                var validLeader = await checkProjectLeaderUser(userId);
                if (!validLeader) errors.Add(buildError(nameof(userId), InputValidationMessageEnum.INVALID_TEAM_LEADER));
            }

            errors.AddRange(checkListOfWorkingDays(request.WorkingDays));

            return errors;
        }
    }
}
