using AutoMapper;
using Backend.Data.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Modules.Master.Common.CompanyDivision
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionMasterController : Controller
    {
        private readonly Comp_DivisionContext _context;
        private readonly TimsContext _userContext;
        private readonly IMapper _mapper;
        public DivisionMasterController(Comp_DivisionContext context, IMapper mapper,TimsContext timsContext)
        {
            _context = context;
            _mapper = mapper;
            _userContext = timsContext;
        }

        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CompDivision>>> GetDivisionMasters()
        {
            var divisions = await _context.CompDivisions.ToListAsync();
            return Ok(_mapper.Map<List<DivisionMasterDTO>>(divisions)); // Fix: Use Ok() to wrap the result in an ActionResult
        }
        [HttpGet("assigned")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<DivisionMasterDTO>>> GetAssignedDivisions()
        {
            // 1. Get user login or ID from claims
            var userLogin = User.Claims.FirstOrDefault(c => c.Type == "login")?.Value;

            if (string.IsNullOrEmpty(userLogin))
                return Unauthorized("User identity not found.");

            // 2. Find user ID from DB if needed (optional)
            var user = await _userContext.MstUsers.FirstOrDefaultAsync(u => u.Login == userLogin);
            if (user == null)
                return NotFound("User not found.");

            
            var divCodes = await _userContext.MstUserDivisions
                .Where(uc => uc.UserId == user.Id)
                .Select(uc => uc.DivisionCode)
                .ToListAsync();

            var divisions = await _context.CompDivisions
                .Where(c => divCodes.Contains(c.DivCode))
                .ToListAsync();

            return Ok(_mapper.Map<List<DivisionMasterDTO>>(divisions));
        }
    }
}
