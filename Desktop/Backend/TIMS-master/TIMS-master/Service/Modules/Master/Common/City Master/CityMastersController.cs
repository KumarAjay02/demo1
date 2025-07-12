using AutoMapper;
using Backend.Data.Contexts;
using Backend.DTOs;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Text;
using System.Data;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2010.PowerPoint;
using System.Xml.Linq;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Paragraph = iTextSharp.text.Paragraph;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityMastersController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;

        public CityMastersController(TmsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CityMasterDTO>>> GetCityMasters()
        {
            try
            {
                var cities = await _context.CityMasters
                    .Include(c => c.StateMaster)
                    .ThenInclude(s => s.CountryMaster)
                    .ToListAsync();

                CityMasterDTO[] cityMasterDTO = _mapper.Map<CityMasterDTO[]>(cities);
                for (int i = 0; i < cityMasterDTO.Length; i++)
                {
                    cityMasterDTO[i].Id = cities[i].SerialNo;
                    cityMasterDTO[i].StateName = cities[i].StateMaster?.StateName;
                    cityMasterDTO[i].CountryName = cities[i].StateMaster?.CountryMaster?.CountryName;
                }
                return cityMasterDTO;
            }
            catch (Exception ex)
            {
                // Log the exception as needed
                return StatusCode(500, "An error occurred while retrieving city masters.");
            }
        }

        // GET: api/CityMasters/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<CityMasterDTO>> GetCityMaster(string id)
        {
            var cityMaster = await _context.CityMasters
    .Include(c => c.StateMaster)
        .ThenInclude(s => s.CountryMaster)
    .FirstOrDefaultAsync(c => c.SerialNo == Convert.ToInt32(id.EqualsIgnoreCase("Nan") ? "0" : id));

            if (cityMaster == null)
            {
                return NotFound();
            }

            CityMasterDTO cityMasterDTO = _mapper.Map<CityMasterDTO>(cityMaster);
            cityMasterDTO.Id = cityMaster.SerialNo;


            cityMasterDTO.StateName = cityMaster.StateMaster?.StateName;
            cityMasterDTO.CountryName = cityMaster.StateMaster?.CountryMaster?.CountryName;

            return cityMasterDTO;
        }

        // PUT: api/CityMasters/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutCityMaster(string id, CityMaster cityMaster)
        {
            if (id != cityMaster.Id.ToString())
            {
                return BadRequest();
            }
            cityMaster.ModifiedBy = User?.Identity?.Name ?? "system";
            cityMaster.ModifiedOn = DateTime.Now;
            _context.Entry(cityMaster).State = EntityState.Modified;
            _context.Entry(cityMaster).Property(c => c.SerialNo).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(cityMaster);
        }

        // POST: api/CityMasters
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CityMaster>> PostCityMaster(CityMasterDTO cityMasterDto)
        {
            CityMaster cityMaster = _mapper.Map<CityMaster>(cityMasterDto);
            cityMaster.CreatedBy = User?.Identity?.Name ?? "system";
            cityMaster.CreatedOn = DateTime.Now;
            _context.CityMasters.Add(cityMaster);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ee1)
            {
                if (CityMasterExists(cityMaster.CityCode))
                {
                    return Conflict();
                }
                else
                {
                    throw new(ee1.Message);
                }
            }
            catch (Exception e)
            {
                throw new(e.Message);
            }

            return Ok(cityMaster);
        }

        // DELETE: api/CityMasters/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteCityMaster(string id)
        {
            var cityMaster = await _context.CityMasters.FirstOrDefaultAsync(c => c.SerialNo == Convert.ToInt32(id));
            if (cityMaster == null)
            {
                return NotFound();
            }

            _context.CityMasters.Remove(cityMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CityMasterExists(string id)
        {
            return _context.CityMasters.Any(e => e.CityCode == id);
        }
        // GET: api/CityMasters
        [HttpPost("/api/CityMasters-search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CityMaster>>> SearchCityMasters([FromBody] CitySearchDTO citySearch)
        {

            var query = _context.CityMasters.Include(c => c.StateMaster)
                .ThenInclude(s => s.CountryMaster)
           .AsQueryable();

            if (!string.IsNullOrEmpty(citySearch.cityCode))
            {
                query = query.Where(c => c.CityCode.Contains(citySearch.cityCode));
            }

            if (!string.IsNullOrEmpty(citySearch.cityName))
            {
                query = query.Where(c => c.CityName.Contains(citySearch.cityName));
            }
            var cities = await query.ToListAsync();
            CityMasterDTO[] cityMasterDTO = _mapper.Map<CityMasterDTO[]>(cities);
            for (int i = 0; i < cityMasterDTO.Length; i++)
            {
                cityMasterDTO[i].Id = cities[i].SerialNo;
                cityMasterDTO[i].StateName = cities[i].StateMaster?.StateName;
                cityMasterDTO[i].CountryName = cities[i].StateMaster?.CountryMaster?.CountryName;
            }

            return Ok(cityMasterDTO);
        }


        [HttpPost("/api/CityMasters-list-download")]
        [Authorize]
        [ResponseCache(Duration = 3600)]
        public async Task<IActionResult> ExportCityMasterExcel([FromBody] CitySearchDTO search)
        {
            try
            {
                var query = _context.CityMasters
            .Include(c => c.StateMaster)
            .ThenInclude(s => s.CountryMaster)
            .AsQueryable();

                // Apply search filters
                if (!string.IsNullOrEmpty(search.cityCode))
                {
                    query = query.Where(c => c.CityCode.Contains(search.cityCode));
                }

                if (!string.IsNullOrEmpty(search.cityName))
                {
                    query = query.Where(c => c.CityName.Contains(search.cityName));
                }
                var cities = await query.ToListAsync();
                var cityMasterDTOs = _mapper.Map<List<CityMasterDTO>>(cities);
                for (int i = 0; i < cityMasterDTOs.Count; i++)
                {
                    cityMasterDTOs[i].Id = cities[i].SerialNo;
                    cityMasterDTOs[i].StateName = cities[i].StateMaster?.StateName;
                    cityMasterDTOs[i].CountryName = cities[i].StateMaster?.CountryMaster?.CountryName;
                }
                if (search.fileType.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return GenerateExcel(cityMasterDTOs);
                }
                else if (search.fileType.Equals("pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return GeneratePdf(cityMasterDTOs);
                }
                return BadRequest("Unsupported format. Use 'xlsx' or 'pdf'.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }


        private IActionResult GenerateExcel(List<CityMasterDTO> cityMasterDTOs)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("City Masters");

                // Headers
                string[] headers = { "City Code", "City Name", "Pin Code", "STD Code", "Category", "Zone", "Country", "State", "Flag", "Updated By", "Updated On" };
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
                for (int i = 0; i < cityMasterDTOs.Count; i++)
                {
                    var c = cityMasterDTOs[i];
                    worksheet.Cell(i + 2, 1).Value = c.CityCode;
                    worksheet.Cell(i + 2, 2).Value = c.CityName;
                    worksheet.Cell(i + 2, 3).Value = c.PinCode;
                    worksheet.Cell(i + 2, 4).Value = c.StdCode;
                    worksheet.Cell(i + 2, 5).Value = c.Category;
                    worksheet.Cell(i + 2, 6).Value = c.Zone;
                    worksheet.Cell(i + 2, 7).Value = c.CountryName;
                    worksheet.Cell(i + 2, 8).Value = c.StateName;
                    worksheet.Cell(i + 2, 9).Value = c.IsActive == "Y" ? "Active" : "Inactive";
                    worksheet.Cell(i + 2, 10).Value = (c.ModifiedBy != null && !c.ModifiedBy.Equals("")) ? c.ModifiedBy : c.CreatedBy;
                    worksheet.Cell(i + 2, 11).Value = (c.ModifiedOn != null && !c.ModifiedOn.Equals("")) ? c.ModifiedOn : c.CreatedOn;

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


        private IActionResult GeneratePdf(List<CityMasterDTO> cityMasterDTOs)
        {
            var document = new iTextSharp.text.Document();
            document.SetMargins(0, 0, 10, 10);
            document.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());

            var outStream = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, outStream);
            writer.CloseStream = false;
            document.Open();

            // Title
            var titleFont = FontFactory.GetFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            var title = new Paragraph("City Master List", titleFont)
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            document.Add(Chunk.NEWLINE);

            // Table with column widths
            float[] columnWidths = { 50f, 100f, 80f, 80f, 80f, 80f, 100f, 100f, 60f };
            var table = new PdfPTable(columnWidths)
            {
                WidthPercentage = 100
            };

            // Table headers
            string[] headers =
            {
        "City Code", "City Name", "Pin Code", "STD Code",
        "Category", "Zone", "Country", "State", "Status"
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

            foreach (var city in cityMasterDTOs)
            {
                // Row number
                //AddTableCell(table, rowNumber++.ToString(), cellFont, Element.ALIGN_CENTER);

                // City data
                AddTableCell(table, city.CityCode ?? "-", cellFont);
                AddTableCell(table, city.CityName ?? "-", cellFont);
                AddTableCell(table, city.PinCode.ToString(), cellFont, Element.ALIGN_CENTER);
                AddTableCell(table, city.StdCode ?? "-", cellFont, Element.ALIGN_CENTER);
                AddTableCell(table, city.Category ?? "-", cellFont, Element.ALIGN_CENTER);
                AddTableCell(table, city.Zone ?? "-", cellFont, Element.ALIGN_CENTER);
                AddTableCell(table, city.CountryName ?? "-", cellFont);
                AddTableCell(table, city.StateName ?? "-", cellFont);

                // Status with conditional formatting
                var status = city.IsActive == "Y" ? "Active" : "Inactive";
                var statusFont = FontFactory.GetFont(FontFactory.COURIER, 10);

                AddTableCell(table, status, statusFont, Element.ALIGN_CENTER);
            }

            document.Add(table);
            document.Close();

            outStream.Position = 0;

            return File(outStream, "application/pdf", "CityMasterList.pdf");
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

        [HttpPost("/api/City-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] CityFilterDTO filter)
        {
            var stateCode = filter.stateCode?.ToLower() ?? "";
            var searchText = filter.txt?.ToLower() ?? "";

            var cities = _context.CityMasters
                .Where(p => p.StateMaster.StateCode.ToLower() == stateCode
                            && p.CityName.ToLower().Contains(searchText)).OrderBy(p => p.CityName)
                .ToList();

            foreach (var city in cities)
            {
                city.Id = city.SerialNo;
            }

            return Ok(cities);
        }
    }
}
