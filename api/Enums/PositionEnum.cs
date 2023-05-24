namespace api.Enums
{
    public class PositionEnum
    {
        public const int MANAGER = 1;
        public const int ASSISTANT_MANAGER = 2;
        public const int ADMIN = 3;
        public const int WEB_DEVELOPER = 4;
        public const int ESL_TEACHER = 5;
        public const int WEB_DEVELOPER_TRAINER = 6;
        public const int WEB_DEVELOPER_TEAM_LEADER = 7;
        public List<int> LEADERS = new List<int> { ADMIN, WEB_DEVELOPER_TEAM_LEADER, WEB_DEVELOPER_TRAINER };

        // static property
        public static List<int> ALL_LEADERS => new PositionEnum().LEADERS;
    }
}
