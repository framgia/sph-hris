using api.Entities;
using api.Enums;

namespace api.DTOs
{
    public class LeavesTableDTO
    {
        public DateTime? Date { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int LeaveTypeId { get; set; }
        public bool IsWithPay { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; }
        public float NumLeaves { get; set; }
        public string? UserName { get; set; }
        public string? LeaveName { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public bool? IsManagerApproved { get; set; }
        public int LeaveId { get; set; }
        public int UserId { get; set; }

        public LeavesTableDTO(Leave data)
        {
            Date = data.LeaveDate;
            CreatedAt = data.CreatedAt;
            LeaveId = data.Id;
            Reason = data.Reason;
            NumLeaves = data.Days;
            UserName = data.User.Name;
            UserId = data.UserId;
            IsWithPay = data.IsWithPay;
            LeaveTypeId = data.LeaveTypeId;
            LeaveName = data.LeaveType.Name;
            IsLeaderApproved = data.IsLeaderApproved;
            IsManagerApproved = data.IsManagerApproved;
            Status = RStatus(data.IsLeaderApproved, data.IsManagerApproved);
        }

        public static string? RStatus(bool? isLeaderApproved, bool? isManagerApproved)
        {
            if (isLeaderApproved == null || isManagerApproved == null)
                return RequestStatus.PENDING;

            if (isLeaderApproved == false || isManagerApproved == false)
                return RequestStatus.DISAPPROVED;

            if (isLeaderApproved == true || isManagerApproved == true)
                return RequestStatus.APPROVED;

            return null;
        }
    }


}
