using api.Context;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class UserService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public UserService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<User>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Users.Include(i => i.Role).ToListAsync();
            }
        }
    }
}
