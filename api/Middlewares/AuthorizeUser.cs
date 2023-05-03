using api.Context;
using api.Enums;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace api.Middlewares
{
    public class AuthorizeUser
    {
        private readonly FieldDelegate _next;

        public AuthorizeUser(FieldDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(IMiddlewareContext context, IHttpContextAccessor accessor, IDbContextFactory<HrisContext> dbContextFactory)
        {
            var httpContext = accessor.HttpContext!;
            try
            {
                if (httpContext.Items["User"] != null || context.Path.ToString().Contains("/createSignIn"))
                {
                    await _next(context);
                }
                else
                {
                    using var dbContext = dbContextFactory.CreateDbContext();

                    // Get the nextAuth token from the custom HTTP header
                    string? nextAuthToken = httpContext.Request.Headers["nextauth-token"];
                    var personalAccessToken = await dbContext.Personal_Access_Tokens
                                            .Where(x => x.Token == nextAuthToken)
                                            .Include(x => x.User)
                                                .ThenInclude(user => user!.Role)
                                            .Include(x => x.User)
                                                .ThenInclude(user => user!.Position)
                                            .FirstOrDefaultAsync();

                    if (personalAccessToken == null) throw new Exception(MiddlewareErrorMessageEnum.UNAUTHENTICATED_USER);

                    // Add the user to the context
                    httpContext.Items["User"] = personalAccessToken?.User;
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
