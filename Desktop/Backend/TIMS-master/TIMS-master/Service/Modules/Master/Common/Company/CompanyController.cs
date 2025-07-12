using AutoMapper;
using Backend.Data.Contexts;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Modules.Master.Common.Company
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private readonly TimsContext _context;
        private readonly IMapper _mapper;
        public CompanyController(TimsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/CompanyMasters
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CompanyMasterDTO>>> GetCompanyMasters()
        {
            var companies = await _context.CompanyMasters.ToListAsync();
            return Ok(_mapper.Map<List<CompanyMasterDTO>>(companies)); // Fix: Use Ok() to wrap the result in an ActionResult
        }
        [HttpGet("assigned")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CompanyMasterDTO>>> GetAssignedCompanies()
        {
            try
            {
                // 1. Get user login or ID from claims
                var userLogin = User.Claims.FirstOrDefault(c => c.Type == "login")?.Value;

                if (string.IsNullOrEmpty(userLogin))
                    return Unauthorized("User identity not found.");

                // 2. Find user ID from DB if needed (optional)
                var user = await _context.MstUsers.FirstOrDefaultAsync(u => u.Login == userLogin);
                if (user == null)
                    return NotFound("User not found.");

                // 3. Get companies assigned to the user (via mapping table)
                var companyCodes = await _context.MstUserCompanies
                    .Where(uc => uc.UserId == user.Id)
                    .Select(uc => uc.CompanyCode)
                    .ToListAsync();

                var companies = await _context.CompanyMasters
                    .Where(c => companyCodes.Contains(c.CoCode))
                    .ToListAsync();

                return Ok(_mapper.Map<List<CompanyMasterDTO>>(companies));
            }
            catch (Exception ex)
            {
                // Log the exception (you might want to use a logging framework)
                // _logger.LogError(ex, "Error occurred while getting assigned companies");

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An error occurred while processing your request. Please try again later.");
            }
        }

    }
}
