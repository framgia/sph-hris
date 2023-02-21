using api.Entities;

namespace api.DTOs
{
    public class SpecificTimeDTO : Time
    {
        public SpecificTimeDTO(Time times, string domain)
        {
            Id = times.Id;
            TimeHour = times.TimeHour;
            Remarks = times.Remarks;
            CreatedAt = times.CreatedAt;

            Media = new List<File>();
            if (times.Media is not null)
            {
                foreach (var media in times.Media)
                {
                    if (media.MimeType is not null && media.FileName is not null)
                    {
                        {
                            File mediaFile = new(media.MimeType, $"{domain}/media/{media.CollectionName}/{media.FileName}", media!.FileName);
                            this.Media.Add(mediaFile);
                        }
                    }
                }
            }
        }
        new public ICollection<File>? Media { get; set; }
        new public int Id { get; set; }
        new public TimeSpan? TimeHour { get; set; }
        new public string? Remarks { get; set; }
        new public DateTime? CreatedAt { get; set; }
    }
    public class File
    {
        public string MimeType { get; set; } = string.Empty;
        public string Link { get; set; }
        public string FileName { get; set; } = string.Empty;

        public File(string mimeType, string link, string fileName)
        {
            MimeType = mimeType;
            Link = link;
            FileName = fileName;
        }
    }
}
