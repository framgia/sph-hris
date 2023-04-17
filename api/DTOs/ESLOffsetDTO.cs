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
                IsUsed = eslOffset.IsUsed;
            }

        }
    }

    public class ESLOffsetNotificationDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int TeamLeaderId { get; set; }
        public int? ESLChangeShiftRequestId { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public bool? IsLeaderApproved { get; set; }
        public bool IsUsed { get; set; }
        public string TimeIn { get; set; } = default!;
        public string TimeOut { get; set; } = default!;

        public ESLOffsetNotificationDTO(ESLOffset eslOffset)
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
                IsUsed = eslOffset.IsUsed;
            }

        }
    }
}
