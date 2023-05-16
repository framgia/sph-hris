using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class ProjectQuery
    {
        private readonly ProjectService _projectService = default!;

        public ProjectQuery(ProjectService projectService)
        {
            _projectService = projectService;
        }

        public async Task<List<Project>> GetProjects()
        {
            return await _projectService.Index();
        }

        public async Task<List<User>> GetAllLeaders(int? projectId)
        {
            return await _projectService.GetAllLeaders(projectId);
        }
    }
}
