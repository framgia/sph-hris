using api.Context;
using api.Entities;
using api.Enums;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class UserService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;
        public UserService(IDbContextFactory<HrisContext> contextFactory, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _httpService = new HttpContextService(accessor);
        }
        public async Task<List<User>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Users.Include(i => i.Role).ToListAsync();
            }
        }

        public string GenerateAvatarLink(int avatarId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var avatar = context.Medias.FindAsync(avatarId).Result;
                var avatarLink = $"{_httpService.getDomainURL()}/media/{avatar?.CollectionName}/{avatar?.FileName}";

                return avatarLink;
            }
        }

        public async Task<List<User>> ESLUsers(int? exceptUserId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Users
                    .Include(x => x.Role)
                    .Include(x => x.Position)
                    .Where(x => x.PositionId == PositionEnum.ESL_TEACHER && x.Id != exceptUserId)
                    .ToListAsync();
            }
        }
    }
}
