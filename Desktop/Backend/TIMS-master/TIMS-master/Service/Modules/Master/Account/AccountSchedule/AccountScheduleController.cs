using AutoMapper;
using Backend.Data.Contexts;
using Backend.Features.Login;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using ServiceStack;
using ServiceStack.Text;
using System.Linq;
using Paragraph = iTextSharp.text.Paragraph;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Account.AccountSchedule
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountScheduleController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;
        public AccountScheduleController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AccountScheduleDTO>>> GetAccountSchedules()
        {

            var acSchedules = await _context.Fin_Gl_Account_Schedules.Join(_context.Fin_Gl_Account_Nature, c => c.GlNature, n => n.AccountNature,
                (c, n) => new AccountScheduleDTO
                {
                    serialNo = c.SerialNo,
                    scheduleCode = c.ScheduleCode,
                    scheduleDesc = c.ScheduleDesc,
                    glNature = c.GlNature,
                    status = c.Status,
                    accountNatureDesc = n.AccountNatureDesc,
                    createdBy = c.CreatedBy,
                    createdOn = c.CreatedOn,
                    modifiedBy = c.ModifiedBy,
                    modifiedOn = c.ModifiedOn
                }).ToListAsync();

            return acSchedules;

            //var acSchedules = await _context.Fin_Gl_Account_Schedules.Include(c => c.Fin_Gl_Account_Natures).ToListAsync();
            //AccountScheduleDTO[] accountScheduleDTO = _mapper.Map<AccountScheduleDTO[]>(acSchedules);
            //for (int i = 0; i < accountScheduleDTO.Length; i++)
            //{
            //    accountScheduleDTO[i].glNature = acSchedules[i].GlNature;
            //    accountScheduleDTO[i].accountNatureDesc = acSchedules[i].Fin_Gl_Account_Natures?.AccountNatureDesc;
            //}
            //return accountScheduleDTO;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountScheduleDTO>> GetAccountSchedule(string id)
        {

            var accountScheduleDTO = await _context.Fin_Gl_Account_Schedules.Join(_context.Fin_Gl_Account_Nature, c => c.GlNature, n => n.AccountNature,
               (c, n) => new AccountScheduleDTO
               {
                   serialNo = c.SerialNo,
                   scheduleCode = c.ScheduleCode,
                   scheduleDesc = c.ScheduleDesc,
                   glNature = c.GlNature,
                   status = c.Status,
                   accountNatureDesc = n.AccountNatureDesc,
                   createdBy = c.CreatedBy,
                   createdOn = c.CreatedOn,
                   modifiedBy = c.ModifiedBy,
                   modifiedOn = c.ModifiedOn
               }).ToListAsync();

            var acSchedule = accountScheduleDTO.FirstOrDefault(c => c.serialNo == Convert.ToInt32(id));
            if (acSchedule == null)
            {
                return NotFound();
            }
            return Ok(acSchedule);
        }
        // PUT: api/AccountSchedules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountSchedule(string id, Fin_Gl_Account_Schedules accountSchedule)
        {
            if (id != accountSchedule.SerialNo.ToString())
            {
                return BadRequest();
            }
            accountSchedule.ModifiedBy = User?.Identity?.Name ?? "system";
            accountSchedule.ModifiedOn = DateTime.Now;
            _context.Entry(accountSchedule).State = EntityState.Modified;
            _context.Entry(accountSchedule).Property(c => c.ScheduleCode).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(accountSchedule);
        }
        private bool AccountScheduleExists(string id)
        {
            return _context.Fin_Gl_Account_Schedules.Any(e => e.SerialNo == Convert.ToInt32(id));
        }
        // POST: api/AccountSchedules
        [HttpPost]
        public async Task<ActionResult<Fin_Gl_Account_Schedules>> PostAccountSchedule(AccountScheduleDTO accountScheduleDTO)
        {
            Fin_Gl_Account_Schedules accountSchedule = _mapper.Map<Fin_Gl_Account_Schedules>(accountScheduleDTO);
            accountSchedule.CreatedBy = User?.Identity?.Name ?? "system";
            accountSchedule.CreatedOn = DateTime.Now;
            _context.Fin_Gl_Account_Schedules.Add(accountSchedule);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountScheduleExists(accountSchedule.ScheduleCode.ToString()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(accountSchedule);
        }

        // DELETE: api/AccountSchedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountSchedule(string id)
        {
            var accountScheduleDTO = _context.Fin_Gl_Account_Schedules.Join(_context.Fin_Gl_Account_Nature, c => c.GlNature, n => n.AccountNature,
                (c, n) => new AccountScheduleDTO
                {
                    serialNo = c.SerialNo,
                    scheduleCode = c.ScheduleCode,
                    scheduleDesc = c.ScheduleDesc,
                    glNature = c.GlNature,
                    status = c.Status,
                    accountNatureDesc = n.AccountNatureDesc,
                    createdBy = c.CreatedBy,
                    createdOn = c.CreatedOn,
                    modifiedBy = c.ModifiedBy,
                    modifiedOn = c.ModifiedOn
                }).AsQueryable();

            var acSchedule = accountScheduleDTO.FirstOrDefault(c => c.serialNo == Convert.ToInt32(id));
            Fin_Gl_Account_Schedules accountSchedule = _mapper.Map<Fin_Gl_Account_Schedules>(acSchedule);
            if (accountSchedule == null)
            {
                return NotFound();
            }

            _context.Fin_Gl_Account_Schedules.Remove(accountSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/AccountNatures
        [HttpPost("/api/AccountSchedule-search")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<Fin_Gl_Account_Schedules>>> SearchAccountSchedule([FromBody] AccountScheduleSearchDTO acScheduleSearch)
        {

            var query = _context.Fin_Gl_Account_Schedules.Join(_context.Fin_Gl_Account_Nature, c => c.GlNature, n => n.AccountNature,
                (c, n) => new AccountScheduleDTO
                {
                    serialNo = c.SerialNo,
                    scheduleCode = c.ScheduleCode,
                    scheduleDesc = c.ScheduleDesc,
                    glNature = c.GlNature,
                    status = c.Status,
                    accountNatureDesc = n.AccountNatureDesc,
                    createdBy = c.CreatedBy,
                    createdOn = c.CreatedOn,
                    modifiedBy = c.ModifiedBy,
                    modifiedOn = c.ModifiedOn
                }).AsQueryable();

            if (!string.IsNullOrEmpty(acScheduleSearch.scheduleCode.ToString()) && acScheduleSearch.scheduleCode > 0)
            {
                query = query.Where(c => c.scheduleCode == acScheduleSearch.scheduleCode);
            }
            if (!string.IsNullOrEmpty(acScheduleSearch.scheduleDesc))
            {
                query = query.Where(c => c.scheduleDesc.Contains(acScheduleSearch.scheduleDesc));
            }
            if (!string.IsNullOrEmpty(acScheduleSearch.glNature.ToString()))
            {
                query = query.Where(c => c.glNature == acScheduleSearch.glNature);
            }
            var acSchedule = await query.ToListAsync();

            return Ok(acSchedule);
        }


        [HttpPost("/api/AccountSchedule-list-download")]
        [Authorize]
        [ResponseCache(Duration = 3600)]
        public async Task<IActionResult> ExportAcScheduleExcel([FromBody] AccountScheduleSearchDTO search)
        {
            try
            {
                var query = _context.Fin_Gl_Account_Schedules.Join(_context.Fin_Gl_Account_Nature, c => c.GlNature, n => n.AccountNature,
                (c, n) => new AccountScheduleDTO
                {
                    serialNo = c.SerialNo,
                    scheduleCode = c.ScheduleCode,
                    scheduleDesc = c.ScheduleDesc,
                    glNature = c.GlNature,
                    status = c.Status,
                    accountNatureDesc = n.AccountNatureDesc,
                    createdBy = c.CreatedBy,
                    createdOn = c.CreatedOn,
                    modifiedBy = c.ModifiedBy,
                    modifiedOn = c.ModifiedOn
                }).AsQueryable();

                // Apply search filters
                if (!string.IsNullOrEmpty(search.scheduleCode.ToString()))
                {
                    query = query.Where(c => c.scheduleCode == search.scheduleCode);
                }
                if (!string.IsNullOrEmpty(search.scheduleDesc))
                {
                    query = query.Where(c => c.scheduleDesc.Contains(search.scheduleDesc));
                }
                var schedules = await query.ToListAsync();
                //var accountScheduleDTOs = _mapper.Map<List<AccountScheduleDTO>>(schedules);
                //for (int i = 0; i < accountScheduleDTOs.Count; i++)
                //{
                //    accountScheduleDTOs[i].scheduleCode = schedules[i].scheduleCode;
                //    accountScheduleDTOs[i].accountNatureDesc = schedules[i].Fin_Gl_Account_Natures?.AccountNatureDesc;
                //}
                if (search.fileType.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return GenerateExcel(schedules);
                }
                else if (search.fileType.Equals("pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return GeneratePdf(schedules);
                }
                return BadRequest("Unsupported format. Use 'xlsx' or 'pdf'.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private IActionResult GenerateExcel(List<AccountScheduleDTO> accountScheduleDTOs)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Account Schedule Masters");

                // Headers
                string[] headers = { "Schedule Code", "Schedule Name", "Nature Code", "Flag", "Updated By", "Updated On" };
                for (int col = 1; col <= headers.Length; col++)
                {
                    var cell = worksheet.Cell(1, col);
                    cell.Value = headers[col - 1];
                    cell.Style.Fill.BackgroundColor = XLColor.DarkBlue;
                    cell.Style.Font.Bold = true;
                    cell.Style.Font.FontColor = XLColor.White;
                    cell.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    cell.Style.Border.BottomBorder = XLBorderStyleValues.Thick;
                    cell.Style.Border.BottomBorderColor = XLColor.White;
                }

                // Data
                for (int i = 0; i < accountScheduleDTOs.Count; i++)
                {
                    var c = accountScheduleDTOs[i];
                    worksheet.Cell(i + 2, 1).Value = c.scheduleCode;
                    worksheet.Cell(i + 2, 2).Value = c.scheduleDesc;
                    worksheet.Cell(i + 2, 3).Value = c.accountNatureDesc;
                    worksheet.Cell(i + 2, 4).Value = c.status == "ACTIVE" ? "Active" : "Inactive";
                    worksheet.Cell(i + 2, 5).Value = c.modifiedBy != null && !c.modifiedBy.Equals("") ? c.modifiedBy : c.createdBy;
                    worksheet.Cell(i + 2, 6).Value = c.modifiedOn != null && !c.modifiedOn.Equals("") ? c.modifiedOn : c.createdOn;
                }

                worksheet.Columns().AdjustToContents();

                var stream = new MemoryStream();
                workbook.SaveAs(stream);
                stream.Position = 0;

                return File(
                    stream,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "CityMasterList.xlsx"
                );
            }
        }


        private IActionResult GeneratePdf(List<AccountScheduleDTO> accountScheduleDTOs)
        {
            var document = new Document();
            document.SetMargins(0, 0, 10, 10);
            document.SetPageSize(PageSize.A4.Rotate());

            var outStream = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, outStream);
            writer.CloseStream = false;
            document.Open();

            // Title
            var titleFont = FontFactory.GetFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            var title = new Paragraph("Account Schedule List", titleFont)
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            document.Add(Chunk.NEWLINE);

            // Table headers
            string[] headers = { "Schedule Code", "Schedule Name", "Nature Code", "Flag", "Updated By", "Updated On" };

            // Table with column widths
            float[] columnWidths = { 50f, 100f, 80f, 80f, 80f, 80f, 100f, 100f, 60f };
            var table = new PdfPTable(headers.Count())
            {
                WidthPercentage = 100
            };

            foreach (var headerTitle in headers)
            {
                var headerCell = new PdfPCell(new Phrase(headerTitle,
                    FontFactory.GetFont(FontFactory.COURIER_BOLD, 10, BaseColor.BLACK)))
                {
                    BackgroundColor = new BaseColor(211, 211, 211), // Light gray
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    BorderWidth = 1,
                    Padding = 5
                };
                table.AddCell(headerCell);
            }

            // Table data
            var cellFont = FontFactory.GetFont(FontFactory.COURIER, 10, BaseColor.BLACK);
            int rowNumber = 1;

            foreach (var schedule in accountScheduleDTOs)
            {
                // Row number
                //AddTableCell(table, rowNumber++.ToString(), cellFont, Element.ALIGN_CENTER);

                // City data
                AddTableCell(table, schedule.scheduleCode.ToString() ?? "-", cellFont);
                AddTableCell(table, schedule.scheduleDesc ?? "-", cellFont);
                AddTableCell(table, schedule.accountNatureDesc ?? "-", cellFont);
                // Status with conditional formatting
                var status = schedule.status == "ACTIVE" ? "Active" : "Inactive";
                var statusFont = FontFactory.GetFont(FontFactory.COURIER, 10);
                AddTableCell(table, status, statusFont, Element.ALIGN_CENTER);
                var modifiedBy = schedule.modifiedBy != null && !schedule.modifiedBy.Equals("") ? schedule.modifiedBy : schedule.createdBy;
                AddTableCell(table, modifiedBy ?? "-", cellFont);
                var modifiedDate = schedule.modifiedOn != null && !schedule.modifiedOn.Equals("") ? schedule.modifiedOn : schedule.modifiedOn;
                AddTableCell(table, modifiedDate.ToString() ?? "-", cellFont);
            }

            document.Add(table);
            document.Close();

            outStream.Position = 0;

            return File(outStream, "application/pdf", "ScheduleMasterList.pdf");
        }
        private void AddTableCell(PdfPTable table, string text, iTextSharp.text.Font font,
            int alignment = Element.ALIGN_LEFT)
        {
            var cell = new PdfPCell(new Phrase(text, font))
            {
                PaddingLeft = 2,
                VerticalAlignment = Element.ALIGN_MIDDLE,
                HorizontalAlignment = alignment,
                BorderWidth = 0.5f
            };
            table.AddCell(cell);
        }

        [HttpPost("/api/AccountSchedule-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] FilterDTO filter)
        {
            var acNatures = _context.Fin_Gl_Account_Nature.Where(p => p.AccountNatureDesc.Contains(filter.txt)).ToList();
            return Ok(acNatures);
        }
    }
    public class AccountScheduleProfile : Profile
    {
        public AccountScheduleProfile()
        {
            CreateMap<Fin_Gl_Account_Schedules, AccountScheduleDTO>();
            CreateMap<AccountScheduleDTO, Fin_Gl_Account_Schedules>();
        }
    }
}

