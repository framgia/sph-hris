using api.Context;
using api.Entities;
using api.Enums;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class ProjectService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public ProjectService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<List<Project>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Projects
                            .Include(i => i.ProjectLeader)
                            .Include(i => i.ProjectSubLeader)
                            .ToListAsync();
            }
        }

        public async Task<List<User>> GetAllLeaders(int? projectId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var ids = PositionEnum.ALL_LEADERS;

                if (projectId == ProjectId.OJT)
                {
                    ids = new List<int> { PositionEnum.WEB_DEVELOPER_TRAINER };
                }

                return await context.Users
                            .Where(x => ids.Contains(x.PositionId)).ToListAsync();
            }
        }
    }
}
