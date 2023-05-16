using api.Entities;
using api.Enums;

namespace api.DTOs
{
    public class LeavesTableDTO
    {
        public DateTime? Date { get; set; }
        public int LeaveTypeId { get; set; }
        public bool IsWithPay { get; set; }
        public string? Reason { get; set; }
        public float NumLeaves { get; set; }
        public string? Status { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public bool? IsManagerApproved { get; set; }
        public string? LeaveName { get; set; }

        public LeavesTableDTO(Leave data)
        {
            Date = data.LeaveDate;
            LeaveTypeId = data.LeaveTypeId;
            IsWithPay = data.IsWithPay;
            NumLeaves = data.Days;
            Reason = data.Reason;
            IsLeaderApproved = data.IsLeaderApproved;
            IsManagerApproved = data.IsManagerApproved;
            Status = RStatus(data.IsLeaderApproved, data.IsManagerApproved);
            LeaveName = data.LeaveType.Name;
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
