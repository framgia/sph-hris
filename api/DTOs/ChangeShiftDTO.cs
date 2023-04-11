using api.Entities;

namespace api.DTOs
{
    public class ChangeShiftDTO : ChangeShiftRequest
    {
        public new string TimeIn { get; set; } = default!;
        public new string TimeOut { get; set; } = default!;
        public ChangeShiftDTO(ChangeShiftRequest changeShift)
        {
            Id = changeShift.Id;
            UserId = changeShift.UserId;
            TimeEntryId = changeShift.TimeEntryId;
            ManagerId = changeShift.ManagerId;
            TimeIn = changeShift.TimeIn.ToString(@"hh\:mm");
            TimeOut = changeShift.TimeOut.ToString(@"hh\:mm");
            OtherProject = changeShift.OtherProject;
            Description = changeShift.Description;
            IsManagerApproved = changeShift.IsLeaderApproved;
            IsLeaderApproved = changeShift.IsLeaderApproved;
            User = changeShift.User;
            Manager = changeShift.Manager;
            TimeEntry = changeShift.TimeEntry;
            MultiProjects = changeShift.MultiProjects;
        }
    }
}
