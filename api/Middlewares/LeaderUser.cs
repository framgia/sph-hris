using api.Context;
using api.Entities;
using api.Enums;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace api.Middlewares
{
    public class LeaderUser
    {
        private readonly FieldDelegate _next;

        public LeaderUser(FieldDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(IMiddlewareContext context, IHttpContextAccessor accessor, IDbContextFactory<HrisContext> dbContextFactory)
        {
            var httpContext = accessor.HttpContext;
            try
            {
                var user = httpContext!.Items["User"] != null ? (User)httpContext.Items["User"]! : null;

                if (user == null) throw new Exception(MiddlewareErrorMessageEnum.NO_EXISTING_USER);
                if (!PositionEnum.ALL_LEADERS.Contains(user.PositionId)) throw new Exception(MiddlewareErrorMessageEnum.NOT_LEADER_USER);
            }
            catch (Exception e)
            {
                var error = ErrorBuilder.New()
                    .SetMessage(e.Message)
                    .Build();

                throw new GraphQLException(new[] { error });
            }
            await _next(context);
        }
    }
}
