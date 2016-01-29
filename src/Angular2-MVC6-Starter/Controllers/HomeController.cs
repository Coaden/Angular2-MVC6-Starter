using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Http.Features.Authentication;
using Microsoft.AspNet.Mvc;

namespace Angular2_MVC6_Starter.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            var user = HttpContext.User.Identity.Name;
            if (string.IsNullOrEmpty(user))
            {
                ViewData["Message"] = "Your application description page.";
            }

            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
