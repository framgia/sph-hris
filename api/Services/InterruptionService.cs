using api.Context;
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

        public async Task<WorkInterruption> Create(CreateInterruptionRequest interruption)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                WorkInterruption work = context.WorkInterruptions.Add(new WorkInterruption
                {
                    TimeEntryId = interruption.TimeEntryId,
                    WorkInterruptionTypeId = interruption.WorkInterruptionTypeId,
                    OtherReason = interruption.OtherReason,
                    TimeOut = interruption.TimeOut,
                    TimeIn = interruption.TimeIn,
                    Remarks = interruption.Remarks,
                }).Entity;
                await context.SaveChangesAsync();

                return work;
            }
        }
    }
}
