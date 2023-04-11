using api.Entities;

namespace api.DTOs
{
    public class ESLChangeShiftDTO : ESLChangeShiftRequest
    {
        public new string TimeIn { get; set; } = default!;
        public new string TimeOut { get; set; } = default!;
        public ESLChangeShiftDTO(ESLChangeShiftRequest changeShift)
        {
            Id = changeShift.Id;
            UserId = changeShift.UserId;
            TimeEntryId = changeShift.TimeEntryId;
            TeamLeaderId = changeShift.TeamLeaderId;
            TimeIn = changeShift.TimeIn.ToString(@"hh\:mm");
            TimeOut = changeShift.TimeOut.ToString(@"hh\:mm");
            Description = changeShift.Description;
            IsLeaderApproved = changeShift.IsLeaderApproved;
            User = changeShift.User;
            TeamLeader = changeShift.TeamLeader;
            TimeEntry = changeShift.TimeEntry;
        }
    }
}
