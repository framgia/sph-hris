namespace api.Entities
{
    public class Media : BaseEntity
    {
        public int Id { get; set; }
        public string? CollectionName { get; set; }
        public string? Name { get; set; }
        public string? FileName { get; set; }
        public string? MimeType { get; set; }
    }
}
