using api.Context;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class EmployeeServiceInputValidation : CustomInputValidation
    {
        public EmployeeServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public List<IError> CheckAddNewEmployeeRequestInput(AddNewEmployeeRequest request)
        {
            var errors = new List<IError>();

            if (!checkEmailFormat(request.Email))
                errors.Add(buildError(nameof(request.Email), InputValidationMessageEnum.INVALID_EMAIL));

            if (!checkPositionExist(request.PositionId).Result)
                errors.Add(buildError(nameof(request.PositionId), InputValidationMessageEnum.INVALID_POSITION));

            if (!checkRoleExist(request.RoleId).Result)
                errors.Add(buildError(nameof(request.RoleId), InputValidationMessageEnum.INVALID_ROLE));

            if (request.ScheduleId != null && !checkScheduleExist((int)request.ScheduleId).Result)
                errors.Add(buildError(nameof(request.ScheduleId), InputValidationMessageEnum.INVALID_SCHEDULE));

            if (request.FirstName == "")
                errors.Add(buildError(nameof(request.FirstName), InputValidationMessageEnum.INVALID_FIRST_NAME));

            if (request.MiddleName != null && request.MiddleName == "")
                errors.Add(buildError(nameof(request.MiddleName), InputValidationMessageEnum.INVALID_MIDDLE_NAME));

            if (request.LastName == "")
                errors.Add(buildError(nameof(request.LastName), InputValidationMessageEnum.INVALID_LAST_NAME));

            return errors;
        }
    }
}
