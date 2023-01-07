
using api.Entities;
using LiteX.Storage.Core;
using MimeTypes;

namespace api.Utils
{
    public class FileUpload
    {
        private readonly ILiteXBlobService _blobService;
        public FileUpload(ILiteXBlobService blobService)
        {
            _blobService = blobService;
        }
        public List<Media> UploadBlob(List<IFile>? files, string collectionName)
        {
            string blobName;
            Stream stream;
            List<Media> media = new List<Media>();
            files?.ForEach(model =>
            {
                blobName = GetUniqueFileName(model.Name);
                stream = model.OpenReadStream();
                _blobService.UploadBlob(collectionName + "/" + blobName, stream);
                media?.Add(new Media
                {
                    CollectionName = collectionName,
                    Name = GetFileName(blobName),
                    FileName = blobName,
                    MimeType = GetMimeType(blobName)
                });
            });
            return media;
        }
        private string GetFileName(string fileName)
        {
            return System.IO.Path.GetFileNameWithoutExtension(fileName);
        }
        private string GetUniqueFileName(string fileName)
        {
            fileName = System.IO.Path.GetFileName(fileName);
            return System.IO.Path.GetFileNameWithoutExtension(fileName)
                    + "-"
                    + Guid.NewGuid().ToString().Substring(0, 4)
                    + System.IO.Path.GetExtension(fileName);
        }
        private string GetMimeType(string fileName)
        {
            return MimeTypeMap.GetMimeType(fileName);
        }
    }
}
