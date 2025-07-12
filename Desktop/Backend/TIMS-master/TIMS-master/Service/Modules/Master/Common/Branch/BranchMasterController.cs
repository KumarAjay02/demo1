using AutoMapper;
using Backend.Data.Contexts;
using Backend.Features.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Modules.Master.Common.Branch
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchMasterController : Controller
    {
        private readonly TimsContext _context;
        private readonly IMapper _mapper;
        public BranchMasterController(TimsContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BranchMaster>>> GetBranchMasters()
        {
            var branch = await _context.BranchMasters.ToListAsync();
            return Ok(_mapper.Map<List<BranchMasterDTO>>(branch)); // Fix: Use Ok() to wrap the result in an ActionResult
        }
        [HttpGet("{branchCode}")]
        [Authorize]
        public async Task<ActionResult<BranchMasterDTO>> GetBranchByCode(string branchCode)
        {
            var branchMaster = await _context.BranchMasters
    .FirstOrDefaultAsync(c => c.BranchCode == branchCode);

            if (branchMaster == null)
            {
                return NotFound();
            }

            BranchMasterDTO branchMasterDTO = _mapper.Map<BranchMasterDTO>(branchMaster);
          

            return branchMasterDTO;
        }

        [HttpPost("/api/Branch-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] FilterDTO filter)
        {
            var searchText = filter.txt?.ToLower() ?? "";

            var branches = _context.BranchMasters
                .Where(p => p.BranchName.ToLower().Contains(searchText)).OrderBy(p => p.BranchName)
                .ToList();

            return Ok(branches);
        }

        [HttpGet("assigned")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BranchMasterDTO>>> GetAssignedBranch()
        {
            try
            {
                // 1. Get user login from claims
                var userLogin = User.Claims.FirstOrDefault(c => c.Type == "login")?.Value;

                if (string.IsNullOrEmpty(userLogin))
                    return Unauthorized("User identity not found.");

                // 2. Find user in the database
                var user = await _context.MstUsers.FirstOrDefaultAsync(u => u.Login == userLogin);
                if (user == null)
                    return NotFound("User not found.");

                // 3. Get branch codes assigned to the user
                var branchCodes = await _context.MstUserBranches
                    .Where(uc => uc.UserId == user.Id)
                    .Select(uc => uc.BranchCode)
                    .ToListAsync();

                // 4. Get branch details
                var branches = await _context.BranchMasters
                    .Where(b => branchCodes.Contains(b.BranchCode))
                    .ToListAsync();

                // 5. Map to DTO and return
                return Ok(_mapper.Map<List<BranchMasterDTO>>(branches));
            }
            catch (Exception ex)
            {
                // Log the error (uncomment if you have a logger)
                // _logger.LogError(ex, "Error fetching assigned branches for user");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while retrieving assigned branches. Please try again later."
                );
            }
        }
    }
}
