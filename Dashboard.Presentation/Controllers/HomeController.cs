﻿using Dashboard.Application.Application.IDashboard;
using Dashboard.Application.ViewModels.Dashboard;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Dashboard.Presentation.Controllers
{
    public class HomeController : Controller
    {
        Logger logger = LogManager.GetLogger("databaseLogger");

        public HomeController()
        {
        }

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}