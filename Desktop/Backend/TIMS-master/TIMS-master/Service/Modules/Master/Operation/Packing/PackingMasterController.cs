// Controllers/PackingMastersController.cs
using AutoMapper;
using Backend.Data.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace Backend.Modules.Master.Operation.Packing
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackingMastersController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;

        public PackingMastersController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PackingMasterDTO>>> GetPackingMasters()
        {
            var items = await _context.PackingMasters.ToListAsync();
            var dtoList = _mapper.Map<List<PackingMasterDTO>>(items);
            return Ok(dtoList);
        }       

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<PackingMasterDTO>> GetPackingMaster(int id)
        {
            var item = await _context.PackingMasters.FindAsync(id);
            if (item == null) return NotFound();

            var dto = _mapper.Map<PackingMasterDTO>(item);
            return Ok(dto);
        }

        [HttpPost("/api/PackingMasters-search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PackingMasterDTO>>> SearchPackingMasters(string code)
        {
            var query = _context.PackingMasters.AsQueryable();

            query = query.Where(p => p.Code.Contains(code));
            var packingList = await query.ToListAsync();
            var packingDTOs = _mapper.Map<List<PackingMasterDTO>>(packingList);

            return Ok(packingDTOs);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PackingMasterDTO dto)
        {
            var entity = new PackingMaster
            {              
                Code = dto.Code,
                Description = dto.Description,
                IsActive = dto.IsActive,
                Created_By = "3408",
                Created_On = DateTime.Now
            };

            _context.PackingMasters.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpPut("{Code}")]
        [Authorize]
        public async Task<IActionResult> PutPackingMaster(string Code, PackingMasterDTO dto)
        {
            if (Code != dto.Code) return BadRequest("Code mismatch.");

            var entity = await _context.PackingMasters.FindAsync(Code);
            if (entity == null) return NotFound();

            _mapper.Map(dto, entity);
            entity.Modfied_By = User?.Identity?.Name ?? "system";
            entity.Modified_On = DateTime.Now;

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var updatedDto = _mapper.Map<PackingMasterDTO>(entity);
            return Ok(updatedDto);
        }


        [HttpDelete("{Code}")]
        [Authorize]
        public async Task<IActionResult> DeletePackingMaster(string Code)
        {
            var entity = await _context.PackingMasters.FindAsync(Code);
            if (entity == null) return NotFound();

            _context.PackingMasters.Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
