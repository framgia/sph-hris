using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class TimeInServiceInputValidation : CustomInputValidation
    {
        // constructor
        public TimeInServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public List<IError> checkTimeInRequestInput(TimeInRequest timeIn, TimeEntry timeEntry)
        {
            var errors = new List<IError>();

            if (timeIn.TimeHour > timeEntry.StartTime && string.IsNullOrEmpty(timeIn.Remarks))
                errors.Add(buildError(nameof(timeIn.Remarks), InputValidationMessageEnum.REQUIRED_TIME_IN_REMARKS));

            return errors;
        }
    }
}
