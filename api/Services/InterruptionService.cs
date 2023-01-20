using api.Context;
using api.DTOs;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class InterruptionService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public InterruptionService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public static WorkInterruptionDTO ToWorkInterruptionDTO(WorkInterruption interruption)
        {
            return new WorkInterruptionDTO(interruption);
        }
        public async Task<List<WorkInterruptionType>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.WorkInterruptionTypes.ToListAsync();
            }
        }
        public async Task<List<WorkInterruptionDTO>> Show(ShowInterruptionRequest interruption)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.WorkInterruptions
                            .Include(i => i.WorkInterruptionType)
                            .Where(i => i.TimeEntryId == interruption.TimeEntryId)
                            .Select(x => ToWorkInterruptionDTO(x))
                            .ToListAsync();
            }
        }
        public async Task<WorkInterruptionDTO> Create(CreateInterruptionRequest interruption)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                WorkInterruption work = context.WorkInterruptions.Add(new WorkInterruption
                {
                    TimeEntryId = interruption.TimeEntryId,
                    WorkInterruptionTypeId = interruption.WorkInterruptionTypeId,
                    OtherReason = interruption.OtherReason,
                    TimeOut = interruption.TimeOut != null ? TimeSpan.Parse(interruption.TimeOut) : null,
                    TimeIn = interruption.TimeIn != null ? TimeSpan.Parse(interruption.TimeIn) : null,
                    Remarks = interruption.Remarks,
                }).Entity;
                await context.SaveChangesAsync();

                return new WorkInterruptionDTO(work);
            }
        }
    }
}
