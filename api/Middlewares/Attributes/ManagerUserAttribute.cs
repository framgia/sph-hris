using System.Reflection;
using System.Runtime.CompilerServices;
using HotChocolate.Types.Descriptors;

namespace api.Middlewares.Attributes
{
    public class ManagerUserAttribute : ObjectFieldDescriptorAttribute
    {
        public ManagerUserAttribute([CallerLineNumber] int order = 0)
        {
            Order = order;
        }

        protected override void OnConfigure(IDescriptorContext context,
            IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Use<ManagerUser>();
        }
    }

}
