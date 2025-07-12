using AutoMapper;
using Backend.Data;
using Backend.Data.Contexts;
using Backend.models;
using Backend.Models;
using Backend.Models.Entities;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Common.PinCode;
using Backend.Modules.Master.Operation.Customer;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Spreadsheet;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using ServiceStack;
using ServiceStack.Script;
using System.Collections;
using System.Data;
using static ServiceStack.LicenseUtils;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly CustomerDbContext _context;
    private readonly TmsContext _tmsContext;
    private readonly PincodeMasterContext _pincodeContext;
    private readonly IMapper _mapper;

    public CustomerController(CustomerDbContext context,TmsContext tmsContext,PincodeMasterContext pincodeContext,IMapper mapper)
    {
        _context = context;
        _tmsContext = tmsContext;
        _pincodeContext = pincodeContext;
        _mapper = mapper;
    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
    {
        try
        {
            var customers = await _context.Customers
                .Include(c => c.CustomerDets)
                .ThenInclude(cd => cd.CustomerDet2s)
                .ToListAsync();

            var customerDtos = customers.Select(c => _mapper.Map<CustomerDto>(c)).ToList();

            return Ok(customerDtos);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpGet("{coCode}/{divCode}/{customerCode}")]
    public async Task<ActionResult<CustomerDto>> GetCustomer(string coCode, string divCode, int customerCode)
    {
        try
        {
            var customer = await _context.Customers
                .Include(c => c.CustomerDets)
                    .ThenInclude(cd => cd.CustomerDet2s)
                     .FirstOrDefaultAsync(c => c.CoCode == coCode && c.DivCode == divCode && c.CustomerCode == customerCode);

            if (customer == null)
            {
                return NotFound();
            }
            var allStates = await _tmsContext.StateMasters.ToListAsync();
            var allcountry = await _tmsContext.CountryMasters.ToListAsync();
            var allcity = await _tmsContext.CityMasters.ToListAsync();
            var allpincode = await _pincodeContext.PincodeMasters.ToListAsync();
            CustomerDto customerDto = _mapper.Map<CustomerDto>(customer);
            foreach (CustomerDetDto customer1 in customerDto.CustomerDets)
            {
                var countryMaster = allcountry.FirstOrDefault(s => s.CountryCode == customer1.Country);
                if (countryMaster != null)
                {
                    customer1.CountryMaster = _mapper.Map<CountryMasterDto>(countryMaster);
                }
                var stateMaster = allStates.FirstOrDefault(s => s.StateCode == customer1.State);
                if (stateMaster != null)
                {
                    customer1.StateMaster = _mapper.Map<StateMasterDTO>(stateMaster);
                }
                var cityMaster = allcity.FirstOrDefault(c => c.CityCode == customer1.City);
                if (cityMaster != null)
                {
                    customer1.CityMaster = _mapper.Map<CityMasterDTO>(cityMaster);
                }
                var pincodeMaster = allpincode.FirstOrDefault(p => p.PinCode == customer1.PinCode);
                if (pincodeMaster != null)
                {
                    customer1.PinCodeMaster = _mapper.Map<PincodeMasterDTO>(pincodeMaster);
                }
            }
            return customerDto;
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpGet("{customerCode}")]
    public async Task<ActionResult<CustomerDto>> GetCustomerByCode(int customerCode)
    {
        try
        {
            var customer = await _context.Customers
                .Include(c => c.CustomerDets)
                    .ThenInclude(cd => cd.CustomerDet2s)
                     .FirstOrDefaultAsync(c => c.CustomerCode == customerCode);

            if (customer == null)
            {
                return NotFound();
            }
            var allStates = await _tmsContext.StateMasters.ToListAsync();
            var allcountry = await _tmsContext.CountryMasters.ToListAsync();
            var allcity = await _tmsContext.CityMasters.ToListAsync();
            var allpincode = await _pincodeContext.PincodeMasters.ToListAsync();
            CustomerDto customerDto = _mapper.Map<CustomerDto>(customer);
            foreach ( CustomerDetDto customer1 in customerDto.CustomerDets)
            {
                var countryMaster = allcountry.FirstOrDefault(s => s.CountryCode == customer1.Country);
                if (countryMaster != null)
                {
                    customer1.CountryMaster = _mapper.Map<CountryMasterDto>(countryMaster);
                }
                var stateMaster = allStates.FirstOrDefault(s => s.StateCode == customer1.State);
                if (stateMaster != null)
                {
                    customer1.StateMaster = _mapper.Map<StateMasterDTO>(stateMaster);
                }
                var cityMaster = allcity.FirstOrDefault(c => c.CityCode == customer1.City);
                if (cityMaster != null)
                {
                    customer1.CityMaster = _mapper.Map<CityMasterDTO>(cityMaster);
                }
                var pincodeMaster = allpincode.FirstOrDefault(p => p.PinCode == customer1.PinCode);
                if (pincodeMaster != null)
                {
                    customer1.PinCodeMaster = _mapper.Map<PincodeMasterDTO>(pincodeMaster);
                }   
            }
            return customerDto;
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CustomerDto>> PostCustomer(CustomerDto customerDto)
    {
        var customer = _mapper.Map<Customer>(customerDto);
        customer.CreatedBy = User?.Identity?.Name ?? "system";
        customer.CreatedOn = DateTime.Now;
        customer.CustomerName = customer.CustomerName.ToUpper();
        customer.TradeName = customer.TradeName.ToUpper();
        customer.SuntekCode = customer.SuntekCode.ToUpper();
        customer.PanNo = customer.PanNo.ToUpper();
        _context.Customers.Add(customer);

        if (customerDto.CustomerDets != null && customerDto.CustomerDets.Any())
        {
            customer.CustomerDets = new List<CustomerDet>();
            foreach (var detDto in customerDto.CustomerDets)
            {
                var customerDet = _mapper.Map<CustomerDet>(detDto);
                customerDet.CreatedBy = User?.Identity?.Name ?? "system";
                customerDet.CreatedOn = DateTime.Now;
                customerDet.Gstin = customerDet.Gstin!=null ? customerDet.Gstin.ToUpper() : customerDet.Gstin;
                customerDet.DealingPerson1 = customerDet.DealingPerson1 != null ? customerDet.DealingPerson1.ToUpper() : null;
                customerDet.DealingPerson2 = customerDet.DealingPerson2 != null ? customerDet.DealingPerson2.ToUpper() : null;
                customerDet.Address = customerDet.Address != null ? customerDet.Address.ToUpper() : null;
                if (detDto.CustomerDet2s != null && detDto.CustomerDet2s.Any())
                {
                    customerDet.CustomerDet2s = new List<CustomerDet2>();
                    foreach (var det2Dto in detDto.CustomerDet2s)
                    {
                        customerDet.CustomerDet2s.Add(_mapper.Map<CustomerDet2>(det2Dto));
                    }
                }

                if (customer.CustomerDets == null)
                    customer.CustomerDets = new List<CustomerDet>();

                customer.CustomerDets.Add(customerDet);
            }
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (CustomerExists(customer.CoCode, customer.DivCode, customer.CustomerCode))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }
        catch (Exception e)
        {
            throw;
        }
        var createdCustomer = await _context.Customers
            .Include(c => c.CustomerDets)
            .ThenInclude(cd => cd.CustomerDet2s)
            .FirstOrDefaultAsync(c => c.CoCode == customer.CoCode && c.DivCode == customer.DivCode && c.CustomerCode == customer.CustomerCode);

        return CreatedAtAction("GetCustomer", new { coCode = createdCustomer.CoCode, divCode = createdCustomer.DivCode, customerCode = createdCustomer.CustomerCode },_mapper.Map<CustomerDto>(createdCustomer));

    }

    [HttpPut("{coCode}/{divCode}/{customerCode}")]
    [Authorize]
    public async Task<IActionResult> PutCustomer(string coCode, string divCode, int customerCode, CustomerDto customerDto)
    {
        if (coCode != customerDto.CoCode || divCode != customerDto.DivCode || customerCode != customerDto.CustomerCode)
        {
            return BadRequest();
        }

        var existingCustomer = await _context.Customers
            .Include(c => c.CustomerDets)
            .ThenInclude(cd => cd.CustomerDet2s)
            .FirstOrDefaultAsync(c => c.CoCode == coCode && c.DivCode == divCode && c.CustomerCode == customerCode);

        if (existingCustomer == null)
        {
            return NotFound();
        }
        _context.Entry(existingCustomer).CurrentValues.SetValues(customerDto);
        existingCustomer.ModifiedOn = DateTime.Now;
        existingCustomer.ModifiedBy = User?.Identity?.Name ?? "system";
        existingCustomer.CustomerName = existingCustomer.CustomerName.ToUpper();
        existingCustomer.TradeName = existingCustomer.TradeName.ToUpper();
        existingCustomer.SuntekCode = existingCustomer.SuntekCode.ToUpper();
        existingCustomer.PanNo = existingCustomer.PanNo.ToUpper();

        UpdateCustomerDets(existingCustomer, customerDto);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CustomerExists(coCode, divCode, customerCode))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        catch (Exception e)
        {
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{coCode}/{divCode}/{customerCode}")]
    [Authorize]
    public async Task<IActionResult> DeleteCustomer(string coCode, string divCode, int customerCode)
    {
        var customer = await _context.Customers
            .Include(c => c.CustomerDets)
            .ThenInclude(cd => cd.CustomerDet2s)
            .FirstOrDefaultAsync(c => c.CoCode == coCode && c.DivCode == divCode && c.CustomerCode == customerCode);

        if (customer == null)
        {
            return NotFound();
        }

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CustomerExists(string coCode, string divCode, int customerCode)
    {
        return _context.Customers.Any(e => e.CoCode == coCode && e.DivCode == divCode && e.CustomerCode == customerCode);
    }
    private void UpdateCustomerDets(Customer existingCustomer, CustomerDto customerDto)
    {
        foreach (var existingDet in existingCustomer.CustomerDets.ToList())
        {
            if (!customerDto.CustomerDets.Any(d =>
                d.CoCode == existingDet.CoCode &&
                d.DivCode == existingDet.DivCode &&
                d.Branch == existingDet.Branch &&
                d.CustomerCode == existingDet.CustomerCode &&
                d.CustomerDetCode == existingDet.CustomerDetCode))
            {
                _context.CustomerDets.Remove(existingDet);
            }
        }

        foreach (var detDto in customerDto.CustomerDets)
        {
            var existingDet = existingCustomer.CustomerDets
                .FirstOrDefault(d =>
                    d.CoCode == detDto.CoCode &&
                    d.DivCode == detDto.DivCode &&
                    d.Branch == detDto.Branch &&
                    d.CustomerCode == detDto.CustomerCode &&
                    d.CustomerDetCode == detDto.CustomerDetCode && detDto.CustomerDetCode!=null);

            if (existingDet != null)
            {
                _context.Entry(existingDet).CurrentValues.SetValues(detDto);
                existingDet.ModifiedOn = DateTime.Now;
                existingDet.ModifiedBy = User?.Identity?.Name ?? "system";
                existingDet.Gstin = existingDet.Gstin != null ? existingDet.Gstin.ToUpper() : existingDet.Gstin;
                existingDet.DealingPerson1 = existingDet.DealingPerson1 != null ? existingDet.DealingPerson1.ToUpper() : null;
                existingDet.DealingPerson2 = existingDet.DealingPerson2 != null ? existingDet.DealingPerson2.ToUpper() : null;
                existingDet.Address = existingDet.Address != null ? existingDet.Address.ToUpper() : null;

                UpdateCustomerDet2s(existingDet, detDto);
            }
            else
            {
                // Add new CustomerDet
                var newDet=_mapper.Map<CustomerDet>(detDto);
                newDet.ModifiedOn = DateTime.Now;
                newDet.ModifiedBy = User?.Identity?.Name ?? "system";
                newDet.Gstin = newDet.Gstin != null ? newDet.Gstin.ToUpper() : newDet.Gstin;
                newDet.DealingPerson1 = newDet.DealingPerson1 != null ? newDet.DealingPerson1.ToUpper() : null;
                newDet.DealingPerson2 = newDet.DealingPerson2 != null ? newDet.DealingPerson2.ToUpper() : null;
                newDet.Address = newDet.Address != null ? newDet.Address.ToUpper() : null;

                // Add CustomerDet2s
                foreach (var det2Dto in detDto.CustomerDet2s)
                {
                    newDet.CustomerDet2s.Add(_mapper.Map<CustomerDet2>(det2Dto));
                }
                existingCustomer.CustomerDets.Add(newDet);
            }
        }
    }

    private void UpdateCustomerDet2s(CustomerDet existingDet, CustomerDetDto detDto)
    {
        // Remove CustomerDet2s that don't exist in the DTO
        foreach (var existingDet2 in existingDet.CustomerDet2s.ToList())
        {
            if (!detDto.CustomerDet2s.Any(d2 =>
                d2.CoCode == existingDet2.CoCode &&
                d2.DivCode == existingDet2.DivCode &&
                d2.Branch == existingDet2.Branch &&
                d2.CustomerCode == existingDet2.CustomerCode &&
                d2.CustomerDetCode == existingDet2.CustomerDetCode &&
                d2.PlantCode == existingDet2.PlantCode))
            {
                _context.CustomerDet2s.Remove(existingDet2);
            }
        }

        foreach (var det2Dto in detDto.CustomerDet2s)
        {
            var existingDet2 = existingDet.CustomerDet2s
                .FirstOrDefault(d2 =>
                    d2.CoCode == det2Dto.CoCode &&
                    d2.DivCode == det2Dto.DivCode &&
                    d2.Branch == det2Dto.Branch &&
                    d2.CustomerCode == det2Dto.CustomerCode &&
                    d2.CustomerDetCode == det2Dto.CustomerDetCode &&
                    d2.PlantCode == det2Dto.PlantCode && det2Dto.PlantCode!=null);

            if (existingDet2 != null)
            {
                // Update existing CustomerDet2
                _context.Entry(existingDet2).CurrentValues.SetValues(det2Dto);
            }
            else
            {
                // Add new CustomerDet2
                existingDet.CustomerDet2s.Add(_mapper.Map<CustomerDet2>(det2Dto));
            }
        }
    }
    [HttpPost("/api/Customer-search")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<CityMaster>>> SearchCustomerMasters([FromBody] CustomerSearchDTO customerSearch)
    {

        var query = _context.Customers.Include(c => c.CustomerDets)
            .ThenInclude(s => s.CustomerDet2s)
       .AsQueryable();

        if (customerSearch.CustomerCode!=null && customerSearch.CustomerCode !=0)
        {
            query = query.Where(c => c.CustomerCode==customerSearch.CustomerCode);
        }

        if (!string.IsNullOrEmpty(customerSearch.CustomerName))
        {
            query = query.Where(c => c.CustomerName.Contains(customerSearch.CustomerName));
        }
        if (!string.IsNullOrEmpty(customerSearch.PanNo))
        {
            query = query.Where(c => c.PanNo.Contains(customerSearch.PanNo));
        }
        var customers = await query.ToListAsync();
        CustomerDto[] customer = _mapper.Map<CustomerDto[]>(customers);

        return Ok(customer);
    }
    [HttpPost("/api/Customer-list-download")]
    [Authorize]
    [ResponseCache(Duration = 3600)]
    public async Task<IActionResult> ExportCityMasterExcel([FromBody] CustomerSearchDTO customerSearch)
    {
        try
        {
            var query = _context.Customers
        .Include(c => c.CustomerDets)
        .ThenInclude(s => s.CustomerDet2s)
        .AsQueryable();

            // Apply search filters

            if (customerSearch.CustomerCode != null && customerSearch.CustomerCode != 0)
            {
                query = query.Where(c => c.CustomerCode == customerSearch.CustomerCode);
            }

            if (!string.IsNullOrEmpty(customerSearch.CustomerName))
            {
                query = query.Where(c => c.CustomerName.Contains(customerSearch.CustomerName));
            }
            if (!string.IsNullOrEmpty(customerSearch.PanNo))
            {
                query = query.Where(c => c.PanNo.Contains(customerSearch.PanNo));
            }
            var customers = await query.ToListAsync();
            var customerMasterDTOs = _mapper.Map<List<CustomerDto>>(customers);
            for (int i = 0; i < customerMasterDTOs.Count; i++)
            {
                //customerMasterDTOs[i].Id = customers[i].CustomerCode;
            }
            if (customerSearch.FileType.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
            {
                return GenerateExcel(customerMasterDTOs);
            }
            else if (customerSearch.FileType.Equals("pdf", StringComparison.OrdinalIgnoreCase))
            {
                return GeneratePdf(customerMasterDTOs);
            }
            return BadRequest("Unsupported format. Use 'xlsx' or 'pdf'.");

        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }


    private IActionResult GenerateExcel(List<CustomerDto> customerMasterDTOs)
    {
        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("Customer Masters");

            // Headers
            string[] headers = { "Customer Code", "Customer Name","Suntek Code","Trade Name","Company Code","Division Code","Customer Type","Pan No", "Flag", "Updated By", "Updated On" };
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
            for (int i = 0; i < customerMasterDTOs.Count; i++)
            {
                var c = customerMasterDTOs[i];
               
                worksheet.Cell(i + 2, 1).Value = c.CustomerCode;
                worksheet.Cell(i + 2, 2).Value = c.CustomerName;
                worksheet.Cell(i + 2, 3).Value = c.SuntekCode;
                worksheet.Cell(i + 2, 4).Value = c.TradeName;
                worksheet.Cell(i + 2, 5).Value = c.CoCode;
                worksheet.Cell(i + 2, 6).Value = c.DivCode;
                worksheet.Cell(i + 2, 7).Value = c.Type;
                worksheet.Cell(i + 2, 8).Value = c.PanNo;
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
                "CustomerMasterList.xlsx"
            );
        }
    }


    private IActionResult GeneratePdf(List<CustomerDto> customerMasterDTOs)
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
        var title = new Paragraph("Customer Master List", titleFont)
        {
            Alignment = Element.ALIGN_CENTER
        };
        document.Add(title);
        document.Add(Chunk.NEWLINE);

        // Table with column widths
        float[] columnWidths = { 40f, 60f, 80f, 60f, 80f, 60f, 60f, 60f, 60f, 60f, 60f, 60f };
        var table = new PdfPTable(columnWidths)
        {
            WidthPercentage = 100
        };

        // Table headers
        string[] headers = {"S.No", "Customer Code", "Customer Name", "Suntek Code", "Trade Name", "Company Code",
                    "Division Code", "Customer Type", "Pan No", "Flag", "Updated By", "Updated On" };


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

        foreach (var customer in customerMasterDTOs)
        {
            // Row number
            AddTableCell(table, rowNumber++.ToString(), cellFont, Element.ALIGN_CENTER);
            AddTableCell(table, customer.CustomerCode.ToString() ?? "-", cellFont);
            AddTableCell(table, customer.CustomerName ?? "-", cellFont);
            AddTableCell(table, customer.SuntekCode??"-", cellFont, Element.ALIGN_CENTER);
            AddTableCell(table, customer.TradeName ?? "-", cellFont, Element.ALIGN_CENTER);
            AddTableCell(table, customer.CoCode ?? "-", cellFont, Element.ALIGN_CENTER);
            AddTableCell(table, customer.DivCode ?? "-", cellFont, Element.ALIGN_CENTER);
            AddTableCell(table, customer.Type ?? "-", cellFont);
            AddTableCell(table, customer.PanNo ?? "-", cellFont);

            // Status with conditional formatting
            var status = customer.IsActive == "Y" ? "Active" : "Inactive";
            var statusFont = FontFactory.GetFont(FontFactory.COURIER, 10);

            AddTableCell(table, status, statusFont, Element.ALIGN_CENTER);
            AddTableCell(table, (customer.ModifiedBy != null && !customer.ModifiedBy.Equals("")) ? customer.ModifiedBy : customer.CreatedBy, cellFont);
            AddTableCell(table, (customer.ModifiedOn != null && !customer.ModifiedOn.Equals("")) ? customer.ModifiedOn.ToString() : customer.CreatedOn.ToString(), cellFont);
        }

        document.Add(table);
        document.Close();

        outStream.Position = 0;

        return File(outStream, "application/pdf", "CustomerMasterList.pdf");
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
}