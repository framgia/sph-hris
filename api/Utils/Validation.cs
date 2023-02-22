
using System.Globalization;
using api.Context;
using api.Requests;

using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class CustomInputValidation
    {
        public string VARIABLE_STRING = "variable";
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public CustomInputValidation(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IError buildError(string propertyName, string message, int? index = null)
        {
            if (index != null) return ErrorBuilder.New()
                    .SetMessage(message)
                    .SetExtension(VARIABLE_STRING, char.ToLower(propertyName[0]) + propertyName.Substring(1))
                    .SetExtension("index", index)
                    .Build();

            return ErrorBuilder.New()
                    .SetMessage(message)
                    .SetExtension(VARIABLE_STRING, char.ToLower(propertyName[0]) + propertyName.Substring(1))
                    .Build();
        }

        public string propertyNameToJSONKey(string name)
        {
            return char.ToLower(name[0]) + name.Substring(1);
        }

        public bool checkUserExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.Users.Find(id) != null;
            }
        }

        public bool checkProjectExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.Projects.Find(id) != null;
            }
        }

        public bool checkLeaveType(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.LeaveTypes.Find(id) != null;
            }
        }

        public bool checkDateFormat(string date)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                string format = "yyyy-MM-dd";
                DateTime datetime;
                return DateTime.TryParseExact(date, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out datetime);
            }
        }

        public bool checkLeaveDates(List<LeaveDateRequest> leaveDates)
        {
            return !(leaveDates == null || leaveDates.Count == 0);
        }

        public bool checkLeaveProjects(List<LeaveProjectRequest> leaveProjects)
        {
            return !(leaveProjects == null || leaveProjects.Count == 0);
        }
    }
}
