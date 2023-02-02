using api.Enums;

namespace api.DTOs
{
    public class HeatMapDTO
    {
        public int day { get; set; }
        public int value { get; set; }

        public HeatMapDTO(LeavesTableDTO leaveData)
        {
            day = (leaveData.Date ?? DateTime.Now).Day;
            switch (leaveData.LeaveTypeId)
            {
                case LeaveTypeEnum.UNDERTIME:
                    value = 6;
                    break;
                case LeaveTypeEnum.SICK_LEAVE:
                    value = 12;
                    break;
                case LeaveTypeEnum.VACATION_LEAVE:
                    value = 18;
                    break;
                case LeaveTypeEnum.EMERGENCY_LEAVE:
                    value = 24;
                    break;
                case LeaveTypeEnum.BEREAVEMENT_LEAVE:
                    value = 30;
                    break;
                case LeaveTypeEnum.MATERNITY_LEAVE:
                    value = 36;
                    break;
            }
        }
    }
}
