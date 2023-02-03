using api.Entities;

namespace api.DTOs
{
    public class LeavesTableDTO
    {
        public DateTime? Date { get; set; }
        public int LeaveTypeId { get; set; }
        public bool IsWithPay { get; set; }
        public string? Reason { get; set; }
        public float NumLeaves { get; set; }


        public LeavesTableDTO(Leave data)
        {
            Date = data.LeaveDate;
            LeaveTypeId = data.LeaveTypeId;
            IsWithPay = data.IsWithPay;
            NumLeaves = data.Days;
            Reason = data.Reason;
        }
    }
}
