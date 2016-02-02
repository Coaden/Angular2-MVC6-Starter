using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNet.Mvc;
using Angular2_MVC6_Starter.Models;
using Microsoft.AspNet.Authorization;

namespace Angular2_MVC6_Starter.API
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public HeroesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<Hero> Get()
        {
            var name = User.Identity.Name;
            Console.WriteLine(name + " query'd the Heroes.");
            return _dbContext.Heroes;
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var hero = _dbContext.Heroes.FirstOrDefault(m => m.Id == id);
            if (hero == null)
            {
                return new HttpNotFoundResult();
            }
            else
            {
                return new ObjectResult(hero);
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Hero hero)
        {
            if (hero.Id == 0)
            {
                _dbContext.Heroes.Add(hero);
                _dbContext.SaveChanges();
                return new ObjectResult(hero);
            }
            else
            {
                var original = _dbContext.Heroes.First(h => h.Id == hero.Id);
                original.Name = hero.Name;
                original.Power = hero.Power;
                original.ExtraPower = hero.ExtraPower;
                original.AlterEgo = hero.AlterEgo;
                _dbContext.SaveChanges();

                return new ObjectResult(original);
            }
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var hero = _dbContext.Heroes.First(h => h.Id == id);
            _dbContext.Heroes.Remove(hero);
            _dbContext.SaveChanges();
            return new HttpStatusCodeResult(200);
        }

    }
}