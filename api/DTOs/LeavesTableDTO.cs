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
        public int NumLeaves { get; set; } = 1;


        public LeavesTableDTO(dynamic data)
        {
            if (data.GetType() == typeof(Leave))
            {
                Date = data.LeaveDate;
                LeaveTypeId = data.LeaveTypeId;
                IsWithPay = data.IsWithPay;
            }
            else
            {
                Date = data.CreatedAt;
                LeaveTypeId = LeaveTypeEnum.UNDERTIME;
                IsWithPay = false;
            }
            Reason = data.Reason;
        }
    }
}
