using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class ProjectQuery
    {

        public async Task<List<Project>> GetProjects([Service] ProjectService _projectService)
        {
            return await _projectService.Index();
        }
    }
}
