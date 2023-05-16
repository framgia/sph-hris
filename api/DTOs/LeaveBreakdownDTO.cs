using api.Enums;

namespace api.DTOs
{
    public class LeaveBreakdownDTO
    {
        public int SickLeave { get; set; }
        public int Undertime { get; set; }
        public int VacationLeave { get; set; }
        public int EmergencyLeave { get; set; }
        public int BereavementLeave { get; set; }
        public int MaternityLeave { get; set; }
        public int WithoutPayTotal { get; set; }
        public int WithPayTotal { get; set; }
        public int Pending { get; set; }

        public LeaveBreakdownDTO(List<LeavesTableDTO> leaves)
        {
            SickLeave = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.SICK_LEAVE && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            Undertime = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.UNDERTIME && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            VacationLeave = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.VACATION_LEAVE && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            EmergencyLeave = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.EMERGENCY_LEAVE && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            BereavementLeave = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.BEREAVEMENT_LEAVE && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            MaternityLeave = leaves.Count(w => w.LeaveTypeId == LeaveTypeEnum.MATERNITY_LEAVE && (w.IsLeaderApproved ?? false) && (w.IsManagerApproved ?? false));
            WithoutPayTotal = leaves.Count(w => !w.IsWithPay);
            WithPayTotal = leaves.Count(w => w.IsWithPay);
            Pending = leaves.Count(w => (w.IsLeaderApproved == null) || (w.IsManagerApproved == null));
        }
    }
}
