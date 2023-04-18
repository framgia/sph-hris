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
        private readonly CustomInputValidation _customInputValidation;

        public EmployeeScheduleService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
            _customInputValidation = new CustomInputValidation(_contextFactory);
        }
        public async Task<List<EmployeeScheduleDTO>> GetAllEmployeeScheduleDetails()
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
                .Select(x => new EmployeeScheduleDTO(x))
                .ToListAsync();
        }

        public async Task<List<EmployeeScheduleDTO>> GetEmployeeScheduleDetails(int employeeScheduleId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
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
                    To = TimeSpan.Parse(workingDay.To!)
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
                                    .SetMessage(ErrorMessageEnum.FAILED_SHCEDULE_CREATION)
                                    .Build());
            }
            return SuccessMessageEnum.SCHEDULE_CREATED;
        }

        public async Task<string> Update(UpdateEmployeeScheduleRequest request, HrisContext context)
        {
            // validate inputs
            var errors = _customInputValidation.CheckUpdateEmployeeScheduleRequestInput(request);
            if (errors.Count > 0) throw new GraphQLException(errors);

            //  UPDATE Schedule name
            var updateEmployeeSchedule = await context.EmployeeSchedules.FindAsync(request.EmployeeScheduleId);
            updateEmployeeSchedule!.Name = request.ScheduleName;

            // DELETE old data
            var workingDaysList = await context.WorkingDayTimes.Where(x => x.EmployeeScheduleId == request.EmployeeScheduleId).ToListAsync();
            foreach (WorkingDayTime workingDay in workingDaysList)
            {
                context.Remove(workingDay);
            }

            // Append new data
            foreach (var workingDay in request.WorkingDays)
            {
                var newWorkingDayTimes = new WorkingDayTime
                {
                    EmployeeScheduleId = updateEmployeeSchedule.Id,
                    Day = workingDay.Day,
                    From = TimeSpan.Parse(workingDay.From!),
                    To = TimeSpan.Parse(workingDay.To!)
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
                                    .SetMessage(ErrorMessageEnum.FAILED_SHCEDULE_UPDATE)
                                    .Build());
            }
            return SuccessMessageEnum.SCHEDULE_UPDATED;
        }
    }
}
