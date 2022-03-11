using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Dashboard.Presentation.Models;

namespace Dashboard.Presentation.Controllers
{
    public class ErrorsController : Controller
    {
        public ActionResult Unauthorised()
        {
            return View();
        }
    }
}