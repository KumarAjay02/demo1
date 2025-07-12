using Backend.Data;
using Backend.Features.Login;
using Backend.models;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Text;
using System.Data;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Common.PinCode
{
    [Route("api/[controller]")]
    [ApiController]
    public class PincodeMasterController : ControllerBase
    {
        private readonly PincodeMasterContext _context;

        public PincodeMasterController(PincodeMasterContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PincodeMaster>>> Get()
        {
            var pincodes = await _context.PincodeMasters.ToListAsync();

            foreach (var pincode in pincodes)
            {
                pincode.Id = pincode.SerialNo;
            }


            return pincodes;
        }

      
        [HttpGet("{id}")]
        [Authorize]
        public string Get(int id)
        {
            return "value";
        }

        
        [HttpPost]
        [Authorize]
        public void Post([FromBody] string value)
        {
        }
      
        [HttpPut("{id}")]
        [Authorize]
        public void Put(int id, [FromBody] string value)
        {
        }

       
        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
        }
        [HttpPost("/api/PincodeMaster-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] FilterDTO filter)
        {
            try
            {
                var pincodes = _context.PincodeMasters
                    .Where(p => p.PinCode.ToString().Contains(filter.txt))
                    .ToList();
                foreach (var pincode in pincodes)
                {
                    pincode.Id = pincode.SerialNo;
                }
                return Ok(pincodes);
            }
            catch (Exception ex)
            {
                // Log the exception as needed
                return StatusCode(500, "An error occurred while filtering pincodes.");
            }
        }

    }
}
