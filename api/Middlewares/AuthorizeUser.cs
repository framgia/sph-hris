using System.IdentityModel.Tokens.Jwt;
using System.Text;
using api.Context;
using api.Enums;
using HotChocolate.Language;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
                if (httpContext.Items["User"] != null || context.Path.ToString().Contains("/createSignIn") || context.Operation.Type == OperationType.Subscription)
                {
                    await _next(context);
                }
                else
                {
                    HttpClient httpClient = new HttpClient();
                    using var dbContext = dbContextFactory.CreateDbContext();

                    // Get the token from the HTTP header
                    string? authorization = httpContext.Request.Headers["authorization"];

                    var secret_key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("FE_JWT_SECRET_KEY") ?? "G3r5YS00TMqu0uMs4rA8hH3VQM1C8IRRQ6CexEcNBxU=");

                    var handler = new JwtSecurityTokenHandler();
                    var securityToken = handler.ReadJwtToken(authorization);

                    var tokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(secret_key),
                        ValidIssuer = "sun-hris",
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };

                    SecurityToken validatedToken;
                    try
                    {
                        var principal = handler.ValidateToken(authorization, tokenValidationParameters, out validatedToken);
                    }
                    catch
                    {
                        throw new Exception("Invalid Authentication Token");
                    }

                    var email = securityToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

                    var currentUser = await dbContext.Users
                                        .Where(user => user.Email == email)
                                        .Include(user => user.Position)
                                        .Include(user => user.Role)
                                        .Include(i => i.Role)
                                        .Include(i => i.Position)
                                        .Include(i => i.EmployeeSchedule)
                                            .ThenInclude(i => i.WorkingDayTimes)
                                        .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                                            .ThenInclude(i => i.TimeIn)
                                        .Include(i => i.TimeEntries.OrderByDescending(o => o.CreatedAt))
                                            .ThenInclude(i => i.TimeOut)
                                        .Include(i => i.ProfileImage)
                                        .AsSplitQuery()
                                        .FirstOrDefaultAsync();

                    if (currentUser != null)
                        currentUser.EmployeeSchedule.WorkingDayTimes = currentUser.EmployeeSchedule.WorkingDayTimes
                                                                    .Where(p => p.Day == DateTime.Now.DayOfWeek.ToString())
                                                                    .ToList();

                    if (currentUser == null) throw new Exception(MiddlewareErrorMessageEnum.UNAUTHENTICATED_USER);

                    httpContext.Items["User"] = currentUser;
                }
            }
            catch (Exception e)
            {
                var error = ErrorBuilder.New()
                    .SetMessage(e.Message)
                    .SetCode("UNAUTHORIZED")
                    .Build();

                throw new GraphQLException(new[] { error });
            }
            await _next(context);
        }
    }
}
