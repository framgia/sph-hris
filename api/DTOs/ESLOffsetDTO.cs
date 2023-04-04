using api.Entities;

namespace api.DTOs
{
    public class ESLOffsetDTO : ESLOffset
    {
        public new string TimeIn { get; set; } = default!;
        public new string TimeOut { get; set; } = default!;

        public ESLOffsetDTO(ESLOffset eslOffset)
        {
            if (eslOffset != null)
            {
                Id = eslOffset.Id;
                UserId = eslOffset.UserId;
                TimeEntryId = eslOffset.TimeEntryId;
                TeamLeaderId = eslOffset.TeamLeaderId;
                TimeIn = eslOffset.TimeIn.ToString(@"hh\:mm");
                TimeOut = eslOffset.TimeOut.ToString(@"hh\:mm");
                Title = eslOffset.Title;
                Description = eslOffset.Description;
                IsLeaderApproved = eslOffset.IsLeaderApproved;
                User = eslOffset.User;
                TeamLeader = eslOffset.TeamLeader;
                TimeEntry = eslOffset.TimeEntry;
            }

        }
    }
}
