using DataTablesDotNet.ModelBinding;
using DataTablesDotNet.Models;
using Dashboard.Application.AutoMapper;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Dashboard.Presentation.Schedule;
using System;
using System.Web;
using Microsoft.AspNet.Identity;

namespace Dashboard.Presentation
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            ModelBinders.Binders.Add(typeof(DataTablesRequest), new DataTablesModelBinder());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutoMapperConfig.RegisterMappings();
            AutofacConfig.Register();
            //JobScheduler.Start();
        }
    }
}
