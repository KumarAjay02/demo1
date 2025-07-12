using AutoMapper;
using Backend.Data.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.AspNetCore.Authorization;
namespace Backend.Modules.Master.Operation.BookingBasis
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingBasisModeController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;

        public BookingBasisModeController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //get api working
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingBasisModeDto>>> GetBookingBasisMode()
        {
            var items = await _context.BookingBasisModeModels.ToListAsync();
            var dtoList = _mapper.Map<List<BookingBasisModeDto>>(items);
            return Ok(dtoList);
        }
        // search api 
        [HttpPost("/api/BookingBasisMode-search")]
        public async Task<ActionResult<IEnumerable<BookingBasisModeDto>>> SearchBookingBasisMode(string code)
        {
            var query = _context.BookingBasisModeModels.AsQueryable();

            query = query.Where(p => p.Code.Contains(code));
            var packingList = await query.ToListAsync();
            var packingDTOs = _mapper.Map<List<BookingBasisModeDto>>(packingList);

            return Ok(packingDTOs);
        }
        // start create api working
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookingBasisModeDto dto)
        {
            var entity = new BookingBasisModeModel
            {
                Code = dto.Code,
                Description = dto.Description,
                IsActive = dto.IsActive,
                CreatedBy = "3408",
                CreatedOn = DateTime.Now
            };

           await _context.BookingBasisModeModels.AddAsync(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }
        // End create api 


        //Start Update Api
        [HttpPut("{Code}")]
        public async Task<IActionResult> PutBookingBasisMode(string Code, BookingBasisModeDto dto)
        {
            if (Code != dto.Code) return BadRequest("Code mismatch.");

            var entity = await _context.BookingBasisModeModels.FindAsync(Code);
            if (entity == null) return NotFound();

            _mapper.Map(dto, entity);
           // entity.ModifiedBy = User?.Identity?.Name ?? "system";
          //  entity.ModifiedOn = DateTime.Now;

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var updatedDto = _mapper.Map<BookingBasisModeDto>(entity);
            return Ok(updatedDto);
        }
        //End Update Api

        //Start Delete Api 
        [HttpDelete("{Code}")]
        public async Task<IActionResult> DeleteBookingBasisMode(string Code)
        {
            var entity = await _context.BookingBasisModeModels.FindAsync(Code);
            if (entity == null) return NotFound();

            _context.BookingBasisModeModels.Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        //End Delete Api 







    }
}


