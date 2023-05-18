using api.Enums;

namespace api.DTOs
{
    public class HeatMapDTO
    {
        public int day { get; set; }
        public int value { get; set; }
        public string? leaveName { get; set; }

        public HeatMapDTO(LeavesTableDTO leaveData)
        {
            day = (leaveData.Date ?? DateTime.Now).Day;
            if (leaveData.IsLeaderApproved == null || leaveData.IsManagerApproved == null)
            {
                value = HeatmapValueEnum.PENDING;
                leaveName = leaveData.LeaveName;
            }
            else
            {
                value = GetLeaveValue(leaveData.LeaveTypeId);
            }
        }

        public int GetLeaveValue(int leaveType)
        {
            return leaveType switch
            {
                LeaveTypeEnum.UNDERTIME => HeatmapValueEnum.UNDERTIME,
                LeaveTypeEnum.SICK_LEAVE => HeatmapValueEnum.SICK_LEAVE,
                LeaveTypeEnum.VACATION_LEAVE => HeatmapValueEnum.VACATION_LEAVE,
                LeaveTypeEnum.EMERGENCY_LEAVE => HeatmapValueEnum.EMERGENCY_LEAVE,
                LeaveTypeEnum.BEREAVEMENT_LEAVE => HeatmapValueEnum.BEREAVEMENT_LEAVE,
                LeaveTypeEnum.MATERNITY_LEAVE => HeatmapValueEnum.MATERNITY_LEAVE,
                _ => 0,
            };
        }

        public HeatMapDTO(int day, int value, string? leaveName)
        {
            this.day = day;
            this.value = value;
            this.leaveName = leaveName;
        }
    }
}
