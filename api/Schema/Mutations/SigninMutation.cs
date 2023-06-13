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
        public async Task<string> CreateSignIn()
        {
            try
            {
                return await _signInService.Create();
            }
            catch (GraphQLException)
            {
                throw;
            }
            catch (Exception e)
            {
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(e.Message)
                .Build());
            }
        }
    }
}
