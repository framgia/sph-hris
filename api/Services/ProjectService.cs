using api.Context;
using api.Entities;
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
    }
}
