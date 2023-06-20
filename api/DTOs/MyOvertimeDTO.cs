using api.Entities;

namespace api.DTOs
{
    public class MyOvertimeDTO : Overtime
    {
        public MyOvertimeDTO(Overtime overtimes)
        {
            Id = overtimes.Id;
            Projects = overtimes.MultiProjects;
            OtherProject = overtimes.OtherProject!;
            Manager = overtimes.Manager;
            Supervisor = overtimes.Manager.Name!;
            DateFiled = overtimes.CreatedAt;
            Remarks = overtimes.Remarks!;
            OvertimeDate = overtimes.OvertimeDate;
            RequestedMinutes = overtimes.RequestedMinutes;
            ApprovedMinutes = overtimes.ApprovedMinutes;
            IsLeaderApproved = overtimes.IsLeaderApproved;
            IsManagerApproved = overtimes.IsManagerApproved!;
        }
        new public int Id { get; set; }
        public ICollection<MultiProject> Projects { get; set; } = default!;
        new public string? OtherProject { get; set; } = default!;
        public string Supervisor { get; set; }
        public DateTime? DateFiled { get; set; }
        new public string Remarks { get; set; }
        new public DateTime? OvertimeDate { get; set; }
        new public int? RequestedMinutes { get; set; }
        new public int? ApprovedMinutes { get; set; }
        new public bool? IsLeaderApproved { get; set; }
        new public bool? IsManagerApproved { get; set; }

    }
}
