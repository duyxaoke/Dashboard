using System.Linq;
using System.Web.Mvc;
using DataTablesDotNet;
using DataTablesDotNet.Models;
using Dashboard.Presentation.Filters;
using Dashboard.Presentation.Models;
using DevTrends.MvcDonutCaching;

namespace Dashboard.Presentation.Areas.Admin.Controllers
{
    [MvcAuthorizeAttribute]
    public class RolesController : BaseController
    {
        private readonly ApplicationRoleManager _roleManager;
        private readonly ClaimedActionsProvider _claimedActionsProvider;
        public RolesController(ApplicationRoleManager roleManager, ClaimedActionsProvider claimedActionsProvider)
        {
            _roleManager = roleManager;
            _claimedActionsProvider = claimedActionsProvider;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Data(DataTablesRequest model)
        {
            var data = _roleManager.Roles.AsQueryable();
            var dataTableParser = new DataTablesParser<ApplicationRole>(model, data);
            var formattedList = dataTableParser.Process();
            return Json(formattedList, JsonRequestBehavior.AllowGet);
        }

    }
}