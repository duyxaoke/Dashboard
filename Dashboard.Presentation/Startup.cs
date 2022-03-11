using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Dashboard.Presentation.Startup))]
namespace Dashboard.Presentation
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
