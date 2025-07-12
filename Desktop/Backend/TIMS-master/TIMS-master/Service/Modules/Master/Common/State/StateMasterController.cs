using Backend.Data;
using Backend.Data.Contexts;
using Backend.models;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Text;
using System.Data;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Common.State
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateMasterController : ControllerBase
    {
        private readonly TmsContext _context;

        public StateMasterController(TmsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("/api/State-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] StateFilterDTO filter)
        {
            var countryCode = filter.countryCode?.ToLower() ?? "";
            var searchText = filter.txt?.ToLower() ?? "";

            var states = _context.StateMasters
                .Where(p => p.CountryMaster.CountryCode.ToLower() == countryCode
                            && p.StateName.ToLower().Contains(searchText))
                .ToList();

            foreach (var state in states)
            {
                state.Id = state.SerialNo;
            }

            return Ok(states);
        }

    }
}
