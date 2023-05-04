using api.Context;
using api.Entities;
using api.Enums;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace api.Middlewares
{
    public class AdminUser
    {
        private readonly FieldDelegate _next;

        public AdminUser(FieldDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(IMiddlewareContext context, IHttpContextAccessor accessor, IDbContextFactory<HrisContext> dbContextFactory)
        {
            var httpContext = accessor.HttpContext;
            try
            {
                if (context.Path.ToString().Contains("/createSignIn"))
                {
                    await _next(context);
                }
                else
                {
                    var user = httpContext!.Items["User"] != null ? (User)httpContext.Items["User"]! : null;

                    if (user == null) throw new Exception(MiddlewareErrorMessageEnum.NO_EXISTING_USER);
                    if (user.Role.Name != RoleEnum.HR_ADMIN) throw new Exception(MiddlewareErrorMessageEnum.NOT_ADMIN_USER);
                }
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
