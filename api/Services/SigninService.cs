using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Context;
using api.Entities;
using api.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace api.Services
{
    public class SigninService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SigninService(IDbContextFactory<HrisContext> contextFactory, IHttpContextAccessor httpContextAccessor)
        {
            _contextFactory = contextFactory;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<string> Create()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    HttpClient httpClient = new HttpClient();
                    HttpContext? httpContext = _httpContextAccessor.HttpContext;
                    string? accessToken = httpContext?.Request.Headers["access-token"];

                    var response = await httpClient.GetAsync($"https://www.googleapis.com/oauth2/v3/userinfo?access_token={accessToken}");

                    string? email = "";

                    if (response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();
                        var userInfo = JsonConvert.DeserializeObject<dynamic>(responseContent);
                        email = userInfo?.email;
                    }
                    else
                    {
                        throw new Exception(ErrorMessageEnum.INVALID_ACCESS_TOKEN);
                    }

                    User user = await context.Users.Where(c => c.Email == email).FirstAsync();

                    var newToken = GenerateUserToken(user);

                    return newToken;
                }
                catch
                {
                    throw;
                }
            }
        }

        // private method
        private string GenerateUserToken(User user)
        {
            // Define the signing key (can be any secret string)
            var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("FE_JWT_SECRET_KEY") ?? "G3r5YS00TMqu0uMs4rA8hH3VQM1C8IRRQ6CexEcNBxU=");

            // Create the claims for the user
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.UserData, user.PositionId.ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
            };

            // Create the JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = "sun-hris",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encodedToken = tokenHandler.WriteToken(token);
            return encodedToken;
        }
    }
}
