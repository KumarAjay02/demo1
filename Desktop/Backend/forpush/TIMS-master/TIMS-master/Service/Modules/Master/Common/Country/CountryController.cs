using AutoMapper;
using Backend.Data;
using Backend.Data.Contexts;
using Backend.Features.Login;
using Backend.models;
using Backend.Models;
using Backend.Modules.Master.Country;
using Backend.Services;
using Backend.Shared.ResponseMsg;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using System.Collections.Immutable;
using System.Data;
using System.Security.Cryptography;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Backend.Modules.Master.Common.Country
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly TmsContext _context;
        private readonly IMapper _mapper;


        public CountryController(TmsContext context,IMapper mapper  )
        {
            _context = context;
            _mapper = mapper;
   
            
        }


        [HttpGet("GetCountryList")]
        [Authorize]
        public async Task<ActionResult<ResponseMessage>> GetCountryList()
        {
            var response = new ResponseMessage();

            try
            {
                 
                
                ///show countries with their list of states and each state's cities

                var data = await _context.CountryMasters.Include(c => c.StateMasters).ThenInclude(x=>x.CityMasters).ToListAsync();

               
                if (!data.Any())
                {
                    response.Status = false;
                    response.Message = "No Data found in List !";
                    return StatusCode(StatusCodes.Status404NotFound, response);
                }


                var mapped = _mapper.Map<List<CountryMasterDto>>(data);

                //foreach (var invid in mapped)
                //{
                //    invid.SerialNo = EncryptionHelper.EncryptString(Convert.ToString(invid.SerialNo));
                //}
                if (mapped==null || !mapped.Any())
                {
                    response.Status = false;
                    response.Message = "Mapping failed or no data list to show!";
                    return StatusCode(StatusCodes.Status409Conflict, response);
                }

                response.Status = true;
                response.Message = "Showing the country list!";
                response.Data = mapped;
                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (FormatException ex)
            {
                // Happens when input is not valid Base64
                return BadRequest("Invalid encrypted format. Please check the input." + ex.Message);
            }
            catch (CryptographicException ex)
            {
                // Happens when AES decryption fails
                return BadRequest("Encrypted ID is invalid or has been tampered with." + ex.Message);
            }
            catch (Exception ex)
            {
                 
                response.Status = false;
                response.Message = "Error get list of Countrymaster: " + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        [HttpGet("GetCountryById/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseMessage>> GetCountryById(int id)
        {
            var response = new ResponseMessage();
            try
            {
                //string dec = EncryptionHelper.DecryptString(id);
               // int sernoId = int.Parse(dec);

                if (id == null || id == 0)
                {
                    response.Status = false;
                    response.Message = " Id Can't be null !";
                    return StatusCode(StatusCodes.Status404NotFound, response);
                }
                var data = await _context.CountryMasters.Include(x => x.StateMasters).ThenInclude(d => d.CityMasters).FirstOrDefaultAsync(x => x.SerialNo == id);

                if (data == null)
                {
                    response.Status = false;
                    response.Message = "No Data found Please Enter valid details !";
                    return StatusCode(StatusCodes.Status404NotFound, response);
                }

                var mapp = _mapper.Map<CountryMasterDto>(data);
               // mapp.SerialNo = id;
                if (mapp == null)
                {
                    response.Status = false;
                    response.Message = "Mapping faild or No data to show";
                    return StatusCode(StatusCodes.Status409Conflict, response);
                }

                response.Status = true;
                response.Message = " Data Show successfully !";
                response.Data = mapp;
                return StatusCode(StatusCodes.Status200OK, response);

            }
            catch (FormatException ex)
            {
                // Happens when input is not valid Base64
                return BadRequest("Invalid encrypted format. Please check the input." + ex.Message);
            }
            catch (CryptographicException ex)
            {
                // Happens when AES decryption fails
                return BadRequest("Encrypted ID is invalid or has been tampered with." + ex.Message);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error while  getting single CountryMaster " + ex.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
 
        

       

        [HttpPost("CreateCountry")]
        [Authorize]
       public async Task<ActionResult<ResponseMessage>> CreateCountry([FromBody] CountryCreateUpdateDto country)
        {
            var response = new ResponseMessage();
            try
            {

                

                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    response.Status = false;
                    response.Message = "validation faild " + string.Join(", ", errors);
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }

                if (country.CountryCode.ToLower() == "string" || country.CountryName.ToLower() == "string")
                {
                    response.Message = "validation faild or data formate not right";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }

                var verify =await _context.CountryMasters.FirstOrDefaultAsync(x=>x.CountryCode==country.CountryCode);
                if (verify == null)
                {
                   
                    var mapp = _mapper.Map<CountryMaster>(country);
                    mapp.CreatedOn = DateTime.Now;
                   await _context.CountryMasters.AddAsync(mapp);
                   await _context.SaveChangesAsync();
                    response.Status = true;
                    response.Message = "Country created successfully!";
                    return StatusCode(StatusCodes.Status201Created, response);

                }
                else
                {
                    response.Status = false;
                    response.Message = "This Country Code allready exist! "+country.CountryCode;
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }


            }
            catch (DbUpdateException dbEx)
            {
                response.Status = false;
                response.Message = "Failed to insert data. Please check constraints or duplicate values."+dbEx.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error Create CountryMaster " + ex.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPut("UpdateCountry/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseMessage>> UpdateCountryMaster(int id,[FromBody] CountryCreateUpdateDto update)
        {
            var response = new ResponseMessage();
            try
            {
                //var dec = EncryptionHelper.DecryptString(id);
                //int serialId = int.Parse(dec);

                if(id == null || id == 0)
                {
                    response.Status = false;
                    response.Message = "Id is Required !";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    response.Status = false;
                    response.Message = "validation faild " + string.Join(", ", errors);
                    return StatusCode(StatusCodes.Status400BadRequest, response);

                }
                if(update.IsActive=="string"|| update.CountryName == "string")
                {
                    response.Status = false;
                    response.Message = $"validation faild or data formate not valid {update.CountryCode}";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                var data =await _context.CountryMasters.FirstOrDefaultAsync(x => x.SerialNo == id);
                
                if(data == null)
                {
                    response.Status = false;
                    response.Message = $"Country Id  not found.";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }

                update.ModifiedOn = DateTime.Now.ToString();
                var mapp = _mapper.Map(update,data);
               
                await _context.SaveChangesAsync();

                response.Status = true;
                response.Message = $"Country master Updated Successfully {update.CountryName}";
                return StatusCode(StatusCodes.Status200OK, response);

            }
            catch (FormatException ex)
            {
                // Happens when input is not valid Base64
                return BadRequest("Invalid encrypted format. Please check the input." + ex.Message);
            }
            catch (CryptographicException ex)
            {
                
                // Happens when AES decryption fails
                return BadRequest("Encrypted ID is invalid or has been tampered with." + ex.Message);
            }
            catch (DbUpdateException dbEx)
            {
                response.Status = false;
                response.Message = "Failed to Update data. Please check constraints or duplicate values." + dbEx.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error Update CountryMaster " + ex.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        [HttpDelete("DeleteCountry/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseMessage>> CountryDelete(int id)
        {
            var response = new ResponseMessage();
            response.Status = false;

            try
            {

                //var validId= EncryptionHelper.DecryptString(id);
                //int serialid=int.Parse(validId);

                if (id == null || id == 0)
                {
                    response.Status = false;
                    response.Message = "Id is Required !";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                var data = await _context.CountryMasters.FirstOrDefaultAsync(x => x.SerialNo == id);
                if (data == null)
                {
                    response.Status = false;
                    response.Message = $"Country Id  not found or enter valid details !";
                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                  _context.CountryMasters.Remove(data);
                await _context.SaveChangesAsync();

                response.Status = true;
                response.Message = "Country Deleted successfully !";
                return StatusCode(StatusCodes.Status200OK,response);
            }
            catch (FormatException ex)
            {
                // Happens when input is not valid Base64
                return BadRequest("Invalid encrypted format. Please check the input." + ex.Message);
            }
            catch (CryptographicException ex)
            {
                // Happens when AES decryption fails
                return BadRequest("Encrypted ID is invalid or has been tampered with." + ex.Message);
            }
            catch (DbUpdateException dbEx)
            {
                response.Status = false;
                response.Message = "Failed to Delete check constraints " + dbEx.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error deleting CountryMaster " + ex.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("/api/Country-filter")]
        [Authorize]
        public IActionResult Filter([FromBody] FilterDTO filter)
        {
            var countries = _context.CountryMasters
        .Where(p => p.CountryName.Contains(filter.txt)).ToList();
            foreach (var country in countries)
            {
                country.Id = country.SerialNo;
            }
            return Ok(countries);
        }

    }
}
