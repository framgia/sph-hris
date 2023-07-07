using System.Text.Json;
using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class EmployeeScheduleService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly EmployeeScheduleServiceInputValidation _customInputValidation;
        private readonly HttpContextService _httpService;
        private readonly HttpContext? _httpContext;

        public EmployeeScheduleService(IDbContextFactory<HrisContext> contextFactory, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _customInputValidation = new EmployeeScheduleServiceInputValidation(_contextFactory);
            _httpService = new HttpContextService(accessor);
            _httpContext = accessor.HttpContext;
        }
        public async Task<List<EmployeeScheduleDTO>> GetAllEmployeeScheduleDetails()
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
                .Include(x => x.Users)
                .Select(x => new EmployeeScheduleDTO(x))
                .ToListAsync();
        }

        public async Task<List<EmployeeScheduleDTO>> GetEmployeeScheduleDetails(int employeeScheduleId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
                .Include(x => x.Users)
                .Where(x => x.Id == employeeScheduleId)
                .Select(x => new EmployeeScheduleDTO(x))
                .ToListAsync();
        }

        public async Task<string> Create(CreateEmployeeScheduleRequest request, HrisContext context)
        {
            // validate inputs
            var errors = _customInputValidation.CheckEmployeeScheduleRequestInput(request);

            if (errors.Count > 0) throw new GraphQLException(errors);

            //  Create Schedule
            var newEmployeeSchedule = new EmployeeSchedule
            {
                Name = request.ScheduleName
            };
            context.EmployeeSchedules.Add(newEmployeeSchedule);
            await context.SaveChangesAsync();

            // Create WorkingDayTimes
            foreach (var workingDay in request.WorkingDays)
            {
                var newWorkingDayTimes = new WorkingDayTime
                {
                    EmployeeScheduleId = newEmployeeSchedule.Id,
                    Day = workingDay.Day,
                    From = TimeSpan.Parse(workingDay.From!),
                    To = TimeSpan.Parse(workingDay.To!),
                    BreakFrom = TimeSpan.Parse(workingDay.BreakFrom!),
                    BreakTo = TimeSpan.Parse(workingDay.BreakTo!),
                };
                context.WorkingDayTimes.Add(newWorkingDayTimes);
            }

            try
            {
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_SCHEDULE_CREATION)
                                    .Build());
            }
            return SuccessMessageEnum.SCHEDULE_CREATED;
        }

        public async Task<string> Update(UpdateEmployeeScheduleRequest request, HrisContext context)
        {
            ValidateRequest(request);
            var employeeSchedule = await GetEmployeeSchedule(request.EmployeeScheduleId, context);

            UpdateEmployeeSchedule(employeeSchedule, request);
            DeleteOldWorkingDays(request.EmployeeScheduleId, context);
            AddNewWorkingDays(request.WorkingDays, employeeSchedule.Id, context);

            try
            {
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_SCHEDULE_UPDATE)
                                    .Build());
            }
            return SuccessMessageEnum.SCHEDULE_UPDATED;
        }

        public async Task<string> AddMembersToSchedule(AddMemberToScheduleRequest request, HrisContext context)
        {
            // Validate input request
            AddMemberInputValidation(request, context);

            try
            {
                var users = context.Users.Where(u => request.EmployeeIds.Contains(u.Id)).ToList();

                // Update employee schedule
                AddEmployeeToSchedule(users, request);

                await context.SaveChangesAsync();
            }
            catch
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_ADDING_USER_TO_SCHEDULE)
                                    .Build());
            }

            return SuccessMessageEnum.EMPLOYEE_ADDED;
        }

        public async Task<string> UpdateMemberSchedule(UpdateMemberScheduleRequest request, HrisContext context)
        {
            // Validate input request
            UpdateMemberScheduleInputValidation(request, context);

            try
            {
                var user = context.Users.Find(request.EmployeeId);

                // Update employee schedule
                user!.EmployeeScheduleId = request.ScheduleId;

                await context.SaveChangesAsync();
            }
            catch
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(ErrorMessageEnum.FAILED_ADDING_USER_TO_SCHEDULE)
                                    .Build());
            }

            return SuccessMessageEnum.EMPLOYEE_SCHEDULE_UPDATED;
        }

        public async Task<ChangeScheduleRequest> ChangeSchedule(ChangeSchedRequest request, HrisContext context)
        {
            // Validate input
            var errors = _customInputValidation.checkChangeScheduleRequestInput(request).Result;
            if (errors.Count > 0)
            {
                throw new GraphQLException(errors);
            }

            var user = (User)_httpContext?.Items["User"]!;
            var serializedData = JsonSerializer.Serialize(request.WorkingDays);

            ChangeScheduleRequest changeRequest = new ChangeScheduleRequest
            {
                UserId = user.Id,
                Data = serializedData
            };

            await context.ChangeScheduleRequests.AddAsync(changeRequest);
            await context.SaveChangesAsync();

            return changeRequest;
        }

        private void UpdateMemberScheduleInputValidation(UpdateMemberScheduleRequest request, HrisContext context)
        {
            var errors = _customInputValidation.CheckUpdateMemberScheduleRequestInput(request, context);
            if (errors.Count > 0)
            {
                throw new GraphQLException(errors);
            }
        }

        private static void AddEmployeeToSchedule(List<User> users, AddMemberToScheduleRequest request)
        {
            users.ForEach(c => c.EmployeeScheduleId = request.ScheduleId);
        }

        private void AddMemberInputValidation(AddMemberToScheduleRequest request, HrisContext context)
        {
            var errors = _customInputValidation.CheckAddMemberRequestInput(request, context);
            if (errors.Count > 0)
            {
                throw new GraphQLException(errors);
            }
        }

        private static async Task<EmployeeSchedule> GetEmployeeSchedule(int employeeScheduleId, HrisContext context)
        {
            var employeeSchedule = await context.EmployeeSchedules.FindAsync(employeeScheduleId);
            if (employeeSchedule == null)
            {
                throw new GraphQLException(ErrorBuilder.New()
                                        .SetMessage(InputValidationMessageEnum.INVALID_SCHEDULE_ID)
                                        .Build());
            }
            return employeeSchedule;
        }

        private static void UpdateEmployeeSchedule(EmployeeSchedule employeeSchedule, UpdateEmployeeScheduleRequest request)
        {
            employeeSchedule.Name = request.ScheduleName;
        }

        private static void DeleteOldWorkingDays(int employeeScheduleId, HrisContext context)
        {
            var workingDays = context.WorkingDayTimes.Where(x => x.EmployeeScheduleId == employeeScheduleId);
            context.WorkingDayTimes.RemoveRange(workingDays);
        }

        private static void AddNewWorkingDays(List<WorkingDayTimesRequest> workingDays, int employeeScheduleId, HrisContext context)
        {
            var newWorkingDays = workingDays.Select(x => new WorkingDayTime
            {
                EmployeeScheduleId = employeeScheduleId,
                Day = x.Day,
                From = TimeSpan.Parse(x.From!),
                To = TimeSpan.Parse(x.To!),
                BreakFrom = TimeSpan.Parse(x.BreakFrom!),
                BreakTo = TimeSpan.Parse(x.BreakTo!),
            });
            context.WorkingDayTimes.AddRange(newWorkingDays);
        }

        private void ValidateRequest(UpdateEmployeeScheduleRequest request)
        {
            var errors = _customInputValidation.CheckUpdateEmployeeScheduleRequestInput(request);
            if (errors.Count > 0)
            {
                throw new GraphQLException(errors);
            }
        }

        private void ValidateDeleteRequest(DeleteEmployeeScheduleRequest request)
        {
            var errors = _customInputValidation.CheckDeleteEmployeeScheduleRequestInput(request);
            if (errors.Count > 0)
            {
                throw new GraphQLException(errors);
            }
        }

        public async Task<List<UserDTO>> GetEmployeesBySchedule(int employeeScheduleId)
        {
            var domain = _httpService.getDomainURL();
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.Users
                .Include(i => i.Role)
                .Include(i => i.Position)
                .Include(i => i.EmployeeSchedule)
                .Include(i => i.ProfileImage)
                .Include(i => i.Position)
                .Where(x => x.EmployeeScheduleId == employeeScheduleId)
                .Select(x => new UserDTO(x, domain))
                .ToListAsync();
        }

        public async Task<List<UserDTO>> SearchEmployeesBySchedule(SearchEmployeesByScheduleRequest request)
        {
            var domain = _httpService.getDomainURL();
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.Users
                .Include(i => i.Role)
                .Include(i => i.Position)
                .Include(i => i.EmployeeSchedule)
                .Include(i => i.ProfileImage)
                .Include(i => i.Position)
                .Where(x =>
                    x.EmployeeScheduleId == request.employeeScheduleId && (
                        x.Name!.Contains(request.searchKey) ||
                        x.Email!.Contains(request.searchKey) ||
                        x.Position.Name.Contains(request.searchKey)
                    )
                )
                .Select(x => new UserDTO(x, domain))
                .ToListAsync();
        }
        public async Task<string> Delete(DeleteEmployeeScheduleRequest request, HrisContext context)
        {
            var error = ErrorMessageEnum.FAILED_SCHEDULE_DELETE;
            try
            {
                ValidateDeleteRequest(request);
                var employeeSchedule = await context.EmployeeSchedules.Where(x => x.Id == request.EmployeeScheduleId).FirstAsync();
                var ifHasEmployee = await context.Users.Where(x => x.EmployeeScheduleId == request.EmployeeScheduleId).FirstOrDefaultAsync();
                if (ifHasEmployee == null)
                {
                    context.EmployeeSchedules.Remove(employeeSchedule);
                }
                else
                {
                    error = ErrorMessageEnum.FAILED_SCHEDULE_DELETE_USER;
                    throw new GraphQLException(ErrorBuilder.New()
                        .SetMessage(ErrorMessageEnum.FAILED_SCHEDULE_DELETE_USER)
                        .Build());
                }
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new GraphQLException(ErrorBuilder.New()
                                    .SetMessage(error)
                                    .Build());
            }
            return SuccessMessageEnum.SCHEDULE_DELETED;
        }
    }
}
