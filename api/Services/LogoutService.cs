using api.Context;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class LogoutService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public LogoutService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<string> Logout(LogoutRequest logout)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    Personal_Access_Token tokenExists = await context.Personal_Access_Tokens.Where(c => c.Token == logout.Token).FirstAsync();
                    context.Personal_Access_Tokens.Remove(tokenExists);
                    await context.SaveChangesAsync();
                    transaction.Commit();
                    return "Successfully logged out";
                }
                catch (Exception)
                { return "Token not found"; }
            }
        }

        internal Task<bool> Logout(object logout)
        {
            throw new NotImplementedException();
        }
    }
}
