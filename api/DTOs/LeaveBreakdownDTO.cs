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

        public LeaveBreakdownDTO(List<LeavesTableDTO> leaves)
        {
            SickLeave = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.SICK_LEAVE).Count();
            Undertime = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.UNDERTIME).Count();
            VacationLeave = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.VACATION_LEAVE).Count();
            EmergencyLeave = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.EMERGENCY_LEAVE).Count();
            BereavementLeave = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.BEREAVEMENT_LEAVE).Count();
            MaternityLeave = leaves.Where(w => w.LeaveTypeId == LeaveTypeEnum.MATERNITY_LEAVE).Count();
            WithoutPayTotal = leaves.Where(w => !w.IsWithPay).Count();
            WithPayTotal = leaves.Where(w => w.IsWithPay).Count();
        }
    }
}
