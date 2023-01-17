namespace api.Entities
{
    public class WorkInterruptionType : BaseEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<WorkInterruption> WorkInterruption { get; set; } = default!;
    }
}
