using System.Net;
using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;

namespace api.Middlewares
{
    public class CustomHttpResponseFormatter : DefaultHttpResponseFormatter
    {
        protected override HttpStatusCode OnDetermineStatusCode(
            IQueryResult result, FormatInfo format,
            HttpStatusCode? proposedStatusCode)
        {
            if (result.Errors?.Count > 0 &&
                result.Errors.Any(error => error.Code == "UNAUTHORIZED"))
            {
                return HttpStatusCode.Unauthorized;
            }

            return base.OnDetermineStatusCode(result, format, proposedStatusCode);
        }
    }
}
