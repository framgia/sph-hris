namespace api.Services
{
    public class HttpContextService
    {
        private readonly IHttpContextAccessor _httpContext;
        public HttpContextService(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }

        public string getDomainURL()
        {
            var host = _httpContext.HttpContext?.Request.Host;
            var protocol = _httpContext.HttpContext?.Request.Protocol.ToLower();
            if (protocol != null && protocol.Contains("https")) return $"https://{host}/";
            return $"http://{host}";
        }
    }
}
