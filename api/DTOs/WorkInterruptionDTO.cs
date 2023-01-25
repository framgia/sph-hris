using api.Entities;

namespace api.DTOs
{
    public class WorkInterruptionDTO : WorkInterruption
    {
        public new string? TimeOut { get; set; }
        public new string? TimeIn { get; set; }
        public WorkInterruptionDTO(WorkInterruption interruption)
        {
            Id = interruption.Id;
            TimeEntryId = interruption.TimeEntryId;
            WorkInterruptionTypeId = interruption.WorkInterruptionTypeId;
            OtherReason = interruption.OtherReason;
            Remarks = interruption.Remarks;
            TimeOut = interruption.TimeOut.HasValue ? interruption.TimeOut.Value.ToString(@"hh\:mm\:ss") : null;
            TimeIn = interruption.TimeIn.HasValue ? interruption.TimeIn.Value.ToString(@"hh\:mm\:ss") : null;
            WorkInterruptionType = interruption.WorkInterruptionType;
            CreatedAt = interruption.CreatedAt;
            UpdatedAt = interruption.UpdatedAt;
        }
    }
}
