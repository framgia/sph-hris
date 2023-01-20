namespace api.Requests
{
    public class UpdateInterruptionRequest
    {
        public int Id { get; set; }
        public int WorkInterruptionTypeId { get; set; }
        public string? TimeOut { get; set; }
        public string? TimeIn { get; set; }
        public string? Remarks { get; set; }
        public string? OtherReason { get; set; }

    }
}
