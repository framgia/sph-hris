using api.Context;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class SigninService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public SigninService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<bool> Create(SigninRequest signin)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    User userExist = await context.Users.Where(c => c.Email == signin.Email).FirstAsync();
                    var token = context.Personal_Access_Tokens.Add(new Personal_Access_Token
                    {
                        UserId = userExist.Id,
                        Token = signin.Token,
                        Expiration = signin.Expiration
                    });
                    await context.SaveChangesAsync();
                    transaction.Commit();
                    return true;
                }
                catch (Exception)
                { return false; }
            }
        }
    }
}
