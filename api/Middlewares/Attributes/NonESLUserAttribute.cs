using System.Reflection;
using System.Runtime.CompilerServices;
using HotChocolate.Types.Descriptors;

namespace api.Middlewares.Attributes
{
    public class NonESLUserAttribute : ObjectFieldDescriptorAttribute
    {
        public NonESLUserAttribute([CallerLineNumber] int order = 0)
        {
            Order = order;
        }

        protected override void OnConfigure(IDescriptorContext context,
            IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Use<NonESLUser>();
        }
    }

}
