namespace api.Requests
{
    public class SigninRequest
    {
        public string Email { get; set; } = default!;
        public string Token { get; internal set; } = default!;
        public DateTime Expiration { get; internal set; }

    }
}
