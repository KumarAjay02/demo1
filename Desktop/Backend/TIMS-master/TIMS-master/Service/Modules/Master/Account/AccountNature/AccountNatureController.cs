using AutoMapper;
using Backend.Data.Contexts;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Text;
using Paragraph = iTextSharp.text.Paragraph;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Account.AccountNature
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountNatureController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;

        public AccountNatureController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AccountNatureDTO>>> GetAccountNatures()
        {
            var acNatures = await _context.Fin_Gl_Account_Nature.ToListAsync();

            AccountNatureDTO[] accountNatureDTO = _mapper.Map<AccountNatureDTO[]>(acNatures);
            return accountNatureDTO;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountNatureDTO>> GetAccountNature(string id)
        {
            var acNature = await _context.Fin_Gl_Account_Nature.FirstOrDefaultAsync(c => c.SerialNo == Convert.ToInt32(id.EqualsIgnoreCase("Nan") ? "0" : id));

            if (acNature == null)
            {
                return NotFound();
            }
            AccountNatureDTO accountNatureDTO = _mapper.Map<AccountNatureDTO>(acNature);
            return accountNatureDTO;
        }
        // PUT: api/AccountNatures/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountNature(string id, Fin_Gl_Account_Nature acNature)
        {
            if (id != acNature.AccountNature.ToString())
            {
                return BadRequest();
            }
            if (acNature == null)
            {
                return NotFound();
            }
            _context.Entry(acNature).State = EntityState.Modified;
            _context.Entry(acNature).Property(c => c.AccountNature).IsModified = false;
            acNature.ModifiedBy = User?.Identity?.Name ?? "system";
            acNature.ModifiedOn = DateTime.Now;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountNatureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(acNature);
        }
        private bool AccountNatureExists(string id)
        {
            return _context.Fin_Gl_Account_Nature.Any(e => e.SerialNo == Convert.ToInt32(id));
        }

        // POST: api/AccountNatures
        [HttpPost]
        public async Task<ActionResult<Fin_Gl_Account_Nature>> PostAccountNature(AccountNatureDTO accountNatureDTO)
        {
            int maxAccountNature;
            if (accountNatureDTO.accountNature == 0)
            {
                var nCount = _context.Fin_Gl_Account_Nature.Select(i => i.AccountNature).Count();
                if (nCount > 0)
                {
                    maxAccountNature = _context.Fin_Gl_Account_Nature.Select(i => i.AccountNature).Max() + 1;
                }
                else
                {
                    maxAccountNature = nCount + 1;
                }
            }
            else
            {
                maxAccountNature = accountNatureDTO.accountNature;
            }
            Fin_Gl_Account_Nature acNature = _mapper.Map<Fin_Gl_Account_Nature>(accountNatureDTO);
            acNature.AccountNature = maxAccountNature;
            acNature.CreatedBy = User?.Identity?.Name ?? "system";
            acNature.CreatedOn = DateTime.Now;
            _context.Fin_Gl_Account_Nature.Add(acNature);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountNatureExists(acNature.SerialNo.ToString()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(acNature);
        }

        // DELETE: api/AccountNatures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountNature(string id)
        {
            var accountNature = await _context.Fin_Gl_Account_Nature.FirstOrDefaultAsync(c => c.SerialNo == Convert.ToInt32(id));
            if (accountNature == null)
            {
                return NotFound();
            }

            _context.Fin_Gl_Account_Nature.Remove(accountNature);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/AccountNatures
        [HttpPost("/api/AccountNature-search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AccountNatureDTO>>> SearchAccountNature([FromBody] AccountNatureSearchDTO acNatureSearch)
        {

            var query = _context.Fin_Gl_Account_Nature.AsQueryable();

            if (!string.IsNullOrEmpty(acNatureSearch.accountNature.ToString()) && acNatureSearch.accountNature > 0)
            {
                query = query.Where(c => c.AccountNature == acNatureSearch.accountNature);
            }

            if (!string.IsNullOrEmpty(acNatureSearch.accountNatureDesc))
            {
                query = query.Where(c => c.AccountNatureDesc.Contains(acNatureSearch.accountNatureDesc));
            }

            var acNatures = await query.ToListAsync();

            AccountNatureDTO[] accountNatureDTO = _mapper.Map<AccountNatureDTO[]>(acNatures);
            return Ok(accountNatureDTO);
        }

        [HttpPost("/api/AccountNature-list-download")]
        [Authorize]
        [ResponseCache(Duration = 3600)]
        public async Task<IActionResult> ExportAccountNaturesExcel([FromBody] AccountNatureSearchDTO search)
        {
            try
            {
                var query = _context.Fin_Gl_Account_Nature.AsQueryable();

                // Apply search filters
                if (!string.IsNullOrEmpty(search.accountNature.ToString()) && search.accountNature > 0)
                {
                    query = query.Where(c => c.AccountNature == search.accountNature);
                }
                if (!string.IsNullOrEmpty(search.accountNatureDesc))
                {
                    query = query.Where(c => c.AccountNatureDesc.Contains(search.accountNatureDesc));
                }

                var acNatures = await query.ToListAsync();

                var accountNatureDTO = _mapper.Map<List<AccountNatureDTO>>(acNatures);
                //for (int i = 0; i < accountNatureDTO.Count; i++)
                //{
                //    accountNatureDTO[i].id = acNatures[i].Id;
                //    accountNatureDTO[i].serialNo = acNatures[i].SerialNo;
                //    accountNatureDTO[i].natureDesc = acNatures[i].NatureDesc;
                //}
                if (search.fileType.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return GenerateExcel(accountNatureDTO);
                }
                else if (search.fileType.Equals("pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return GeneratePdf(accountNatureDTO);
                }
                return BadRequest("Unsupported format. Use 'xlsx' or 'pdf'.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private IActionResult GenerateExcel(List<AccountNatureDTO> accountNatureDTOs)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Account Natures");

                // Headers
                string[] headers = { "Nature Code", "Nature Desc.", "Flag", "Updated By", "Updated On" };
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
                for (int i = 0; i < accountNatureDTOs.Count; i++)
                {
                    var c = accountNatureDTOs[i];
                    worksheet.Cell(i + 2, 1).Value = c.accountNature;
                    worksheet.Cell(i + 2, 2).Value = c.accountNatureDesc;
                    worksheet.Cell(i + 2, 3).Value = c.isActive == "Y" ? "Active" : "Inactive";
                    worksheet.Cell(i + 2, 4).Value = c.modifiedBy != null && !c.modifiedBy.Equals("") ? c.modifiedBy : c.createdBy;
                    worksheet.Cell(i + 2, 5).Value = c.modifiedOn != null && !c.modifiedOn.Equals("") ? c.modifiedOn : c.createdOn;
                }

                worksheet.Columns().AdjustToContents();

                var stream = new MemoryStream();
                workbook.SaveAs(stream);
                stream.Position = 0;

                return File(
                    stream,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "AccountNatureList.xlsx"
                );
            }
        }
        private IActionResult GeneratePdf(List<AccountNatureDTO> accountNatureDTOs)
        {
            var document = new Document();
            document.SetMargins(0, 0, 10, 10);
            document.SetPageSize(PageSize.A4.Rotate());

            var outStream = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, outStream);
            writer.CloseStream = false;
            document.Open();

            // Table headers
            string[] headers = { "Nature Code", "Nature Desc.", "Status", "Updated By", "Updated On" };

            // Title
            var titleFont = FontFactory.GetFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            var title = new Paragraph("Account Nature List", titleFont)
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            document.Add(Chunk.NEWLINE);

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

            foreach (var acNature in accountNatureDTOs)
            {
                // Row number
                //AddTableCell(table, rowNumber++.ToString(), cellFont, Element.ALIGN_CENTER);

                // City data
                AddTableCell(table, acNature.accountNature.ToString() ?? "-", cellFont, Element.ALIGN_RIGHT);
                AddTableCell(table, acNature.accountNatureDesc ?? "-", cellFont);
                // Status with conditional formatting
                var status = acNature.isActive == "Y" ? "Active" : "Inactive";
                var statusFont = FontFactory.GetFont(FontFactory.COURIER, 10, acNature.isActive == "Y" ? BaseColor.GREEN : BaseColor.RED);

                AddTableCell(table, status, statusFont, Element.ALIGN_CENTER);
                var modifiedBy = acNature.modifiedBy != null && !acNature.modifiedBy.Equals("") ? acNature.modifiedBy : acNature.createdBy;
                AddTableCell(table, modifiedBy ?? "-", cellFont);
                var modifiedDate = acNature.modifiedOn != null && !acNature.modifiedOn.Equals("") ? acNature.modifiedOn : acNature.createdOn;
                AddTableCell(table, modifiedDate.ToString() ?? "-", cellFont);
            }

            document.Add(table);
            document.Close();

            outStream.Position = 0;

            return File(outStream, "application/pdf", "AccountNatureList.pdf");
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
        public class AccountNatureProfile : Profile
        {
            public AccountNatureProfile()
            {
                CreateMap<Fin_Gl_Account_Nature, AccountNatureDTO>();
                CreateMap<AccountNatureDTO, Fin_Gl_Account_Nature>();
            }
        }

    }

}

