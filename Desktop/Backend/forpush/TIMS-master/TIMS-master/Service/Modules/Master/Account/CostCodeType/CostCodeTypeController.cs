using AutoMapper;
using Backend.Data.Contexts;
using ClosedXML.Excel;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Account.CostCodeType
{
    [Route("api/[controller]")]
    [ApiController]
    public class CostCodeTypeController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;

        public CostCodeTypeController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<fin_cost_code_typeDTO>>> GetCostCodeTypes()
        {
            var costCodeTypes = await _context.fin_cost_code_type.ToListAsync();

            fin_cost_code_typeDTO[] costCodeTypesDTO = _mapper.Map<fin_cost_code_typeDTO[]>(costCodeTypes);
            return costCodeTypesDTO;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<fin_cost_code_typeDTO>> GetCostCodeType(string id)
        {
            var costCodeType = await _context.fin_cost_code_type.FirstOrDefaultAsync(c => c.costCodeId == Convert.ToInt32(id.EqualsIgnoreCase("Nan") ? "0" : id));

            if (costCodeType == null)
            {
                return NotFound();
            }
            fin_cost_code_typeDTO costCodeTypesDTO = _mapper.Map<fin_cost_code_typeDTO>(costCodeType);
            return costCodeTypesDTO;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCostCodeType(string id, fin_cost_code_type costCodeType)
        {
            if (id != costCodeType.costCodeId.ToString())
            {
                return BadRequest();
            }
            if (costCodeType == null)
            {
                return NotFound();
            }
            _context.Entry(costCodeType).State = EntityState.Modified;
            _context.Entry(costCodeType).Property(c => c.costCodeId).IsModified = false;
            costCodeType.ModifiedBy = User?.Identity?.Name ?? "system";
            costCodeType.ModifiedOn = DateTime.Now;
            costCodeType.CreatedBy = User?.Identity?.Name ?? "system";
            costCodeType.CreatedOn = DateTime.Now;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CostCodeTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(costCodeType);
        }
        private bool CostCodeTypeExists(string id)
        {
            return _context.fin_cost_code_type.Any(e => e.costCodeId == Convert.ToInt32(id));
        }
        [HttpPost]
        public async Task<ActionResult<fin_cost_code_type>> PostCostCodeType(fin_cost_code_typeDTO costCodeTypeDTO)
        {
            int maxCostCodeType;
            if (costCodeTypeDTO.costCodeId == 0)
            {
                var nCount = _context.fin_cost_code_type.Select(i => i.costCodeId).Count();
                if (nCount > 0)
                {
                    maxCostCodeType = _context.fin_cost_code_type.Select(i => i.costCodeId).Max() + 1;
                }
                else
                {
                    maxCostCodeType = nCount + 1;
                }
            }
            else
            {
                maxCostCodeType = costCodeTypeDTO.costCodeId;
            }
            fin_cost_code_type costCodeType = _mapper.Map<fin_cost_code_type>(costCodeTypeDTO);
            costCodeType.costCodeId = maxCostCodeType;
            costCodeType.CreatedBy = User?.Identity?.Name ?? "system";
            costCodeType.CreatedOn = DateTime.Now;
            _context.fin_cost_code_type.Add(costCodeType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CostCodeTypeExists(costCodeType.costCodeId.ToString()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(costCodeType);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCostCodeType(string id)
        {
            var costCodeType = await _context.fin_cost_code_type.FirstOrDefaultAsync(c => c.costCodeId == Convert.ToInt32(id));
            if (costCodeType == null)
            {
                return NotFound();
            }

            _context.fin_cost_code_type.Remove(costCodeType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/AccountNatures
        [HttpPost("/api/CostCodeType-search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<fin_cost_code_typeDTO>>> SearchCostCodeType([FromBody] fin_cost_code_typeSearchDTO costCodeTypeSearch)
        {

            var query = _context.fin_cost_code_type.AsQueryable();

            if (!string.IsNullOrEmpty(costCodeTypeSearch.costCodeTypeDesc))
            {
                query = query.Where(c => c.costCodeTypeDesc.Contains(costCodeTypeSearch.costCodeTypeDesc));
            }

            var costCodeTypes = await query.ToListAsync();

            fin_cost_code_typeDTO[] costCodeTypeDTO = _mapper.Map<fin_cost_code_typeDTO[]>(costCodeTypes);
            return Ok(costCodeTypeDTO);
        }
        [HttpPost("/api/CostCodeType-list-download")]
        [Authorize]
        [ResponseCache(Duration = 3600)]
        public async Task<IActionResult> ExportCostCodeTypeExcel([FromBody] fin_cost_code_typeSearchDTO search)
        {
            try
            {
                var query = _context.fin_cost_code_type.AsQueryable();

                if (!string.IsNullOrEmpty(search.costCodeTypeDesc))
                {
                    query = query.Where(c => c.costCodeTypeDesc.Contains(search.costCodeTypeDesc));
                }

                var costCodeTypes = await query.ToListAsync();

                var costCodeTypeDTO = _mapper.Map<List<fin_cost_code_typeDTO>>(costCodeTypes);
                //for (int i = 0; i < costCodeTypeDTO.Count; i++)
                //{
                //    costCodeTypeDTO[i].cost_code_id = costCodeTypes[i].cost_code_id;
                //    costCodeTypeDTO[i].cost_code_type_desc = costCodeTypes[i].cost_code_type_desc;
                //}
                if (search.fileType.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return GenerateExcel(costCodeTypeDTO);
                }
                else if (search.fileType.Equals("pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return GeneratePdf(costCodeTypeDTO);
                }
                return BadRequest("Unsupported format. Use 'xlsx' or 'pdf'.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private IActionResult GenerateExcel(List<fin_cost_code_typeDTO> costCodeTypeDTOs)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Cost Code Type");

                // Headers
                string[] headers = { "Cost Code Id", "Cost Code Type Desc", "Flag", "Updated By", "Updated On" };
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
                for (int i = 0; i < costCodeTypeDTOs.Count; i++)
                {
                    var c = costCodeTypeDTOs[i];
                    worksheet.Cell(i + 2, 1).Value = c.costCodeId;
                    worksheet.Cell(i + 2, 2).Value = c.costCodeTypeDesc;
                    worksheet.Cell(i + 2, 3).Value = c.status;
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
                    "CostCodeTypeList.xlsx"
                );
            }
        }
        private IActionResult GeneratePdf(List<fin_cost_code_typeDTO> costCodeTypeDTOs)
        {
            var document = new Document();
            document.SetMargins(0, 0, 10, 10);
            document.SetPageSize(PageSize.A4.Rotate());

            var outStream = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, outStream);
            writer.CloseStream = false;
            document.Open();

            // Table headers
            string[] headers = { "Cost Code Id", "Cost Code Type Desc", "Flag", "Updated By", "Updated On" };

            // Title
            var titleFont = FontFactory.GetFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            var title = new Paragraph("Cost Code Type List", titleFont)
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

            foreach (var costCodeType in costCodeTypeDTOs)
            {
                // Row number
                //AddTableCell(table, rowNumber++.ToString(), cellFont, Element.ALIGN_CENTER);

                // City data
                AddTableCell(table, costCodeType.costCodeId.ToString() ?? "-", cellFont, Element.ALIGN_RIGHT);
                AddTableCell(table, costCodeType.costCodeTypeDesc ?? "-", cellFont);
                // Status with conditional formatting
                var status = costCodeType.status ?? "-";
                var statusFont = FontFactory.GetFont(FontFactory.COURIER, 10, costCodeType.status == "ACTIVE" ? BaseColor.GREEN : BaseColor.RED);

                AddTableCell(table, status, statusFont, Element.ALIGN_CENTER);
                var modifiedBy = costCodeType.modifiedBy != null && !costCodeType.modifiedBy.Equals("") ? costCodeType.modifiedBy : costCodeType.createdBy;
                AddTableCell(table, modifiedBy ?? "-", cellFont);
                var modifiedDate = costCodeType.modifiedOn != null && !costCodeType.modifiedOn.Equals("") ? costCodeType.modifiedOn : costCodeType.createdOn;
                AddTableCell(table, modifiedDate.ToString() ?? "-", cellFont);
            }

            document.Add(table);
            document.Close();

            outStream.Position = 0;

            return File(outStream, "application/pdf", "CostCodeTypeList.pdf");
        }
        private void AddTableCell(PdfPTable table, string text, Font font,
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
    }
    public class CostCodeTypeProfile : Profile
    {
        public CostCodeTypeProfile()
        {
            CreateMap<fin_cost_code_type, fin_cost_code_typeDTO>();
            CreateMap<fin_cost_code_typeDTO, fin_cost_code_type>();
        }
    }
}
