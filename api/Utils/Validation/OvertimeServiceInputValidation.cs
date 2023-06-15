using api.Context;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class OvertimeServiceInputValidation : CustomInputValidation
    {
        // constructor
        public OvertimeServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public List<IError> checkBulkOvertimeRequestInput(CreateBulkOvertimeRequest request)
        {
            var errors = new List<IError>();
            var index = 0;

            if (!CheckManagerUser(request.ManagerId).Result)
                errors.Add(buildError(nameof(request.ManagerId), InputValidationMessageEnum.INVALID_MANAGER));

            if (!checkDateFormat(request.Date))
                errors.Add(buildError(nameof(request.Date), InputValidationMessageEnum.INVALID_DATE));

            if (!checkProjectExist(request.ProjectId))
                errors.Add(buildError(nameof(request.ProjectId), InputValidationMessageEnum.INVALID_PROJECT, index));


            index = 0;
            request.EmployeeIds?.ForEach(id =>
            {
                if (!checkUserExist(id))
                    errors.Add(buildError(nameof(id), InputValidationMessageEnum.INVALID_USER_ID, index));

                index++;
            });

            return errors;
        }
    }
}
