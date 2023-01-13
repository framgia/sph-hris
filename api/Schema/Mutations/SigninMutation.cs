using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class SigninMutation
    {
        private readonly SigninService _signInService;
        public SigninMutation(SigninService signInService)
        {
            _signInService = signInService;
        }
        public async Task<string> CreateSignIn(SigninRequest signIn)
        {
            return await _signInService.Create(signIn);
        }
    }
}
