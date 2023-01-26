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
        private static WorkInterruption ToWorkInterruption(UpdateInterruptionRequest interruption)
        {
            return new WorkInterruption
            {
                Id = interruption.Id,
                WorkInterruptionTypeId = interruption.WorkInterruptionTypeId,
                TimeOut = interruption.TimeOut != null ? TimeSpan.Parse(interruption.TimeOut) : null,
                TimeIn = interruption.TimeIn != null ? TimeSpan.Parse(interruption.TimeIn) : null,
                Remarks = interruption.Remarks,
                OtherReason = interruption.OtherReason
            };
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
        public async Task<bool> Update(UpdateInterruptionRequest interruption)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                WorkInterruption work = ToWorkInterruption(interruption);
                context.Update(work);
                context.Entry(work).Property(x => x.TimeEntryId).IsModified = false;
                context.Entry(work).Property(x => x.CreatedAt).IsModified = false;
                return await context.SaveChangesAsync() > 0;
            }
        }
        public async Task<bool> Delete(int Id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                context.Entry(new WorkInterruption { Id = Id }).State = EntityState.Deleted;
                return await context.SaveChangesAsync() > 0;
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
