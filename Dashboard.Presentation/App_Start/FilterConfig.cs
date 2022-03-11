using Dashboard.Presentation.Filters;
using System.Web;
using System.Web.Mvc;

namespace Dashboard.Presentation
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new WeborisationFilter());

        }
    }
}
