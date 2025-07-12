
using AutoMapper;
using Backend.Shared.ResponseMsg;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;





namespace Backend.Modules.Master.Operation.RouteMaster
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteMasterController : ControllerBase
    {
        private readonly Tims2Context _dbtims2;
        private readonly IMapper _mapper;
        private ResponseMessage response =new ResponseMessage();
        public RouteMasterController(Tims2Context tims2, IMapper mapper)
        {

            _dbtims2 = tims2;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseMessage>> GetRouteList()
        {

            try
            {
                // var data =await _dbtims2.OprRouteHeader.ToListAsync();
                var data = await _dbtims2.OprRouteHeader.Include(x => x.RouteLine).Select(x=>new OprRouteHeaderDto {
                    RouteNo=x.RouteNo,RouteName=x.RouteName,OriginHub=x.OriginHub,DestHub=x.DestHub
                }).ToListAsync();

                var mapp = _mapper.Map<List<OprRouteHeaderDto>>(data);

                if (mapp == null || !mapp.Any()) 
                {
                    response.Status = false;
                    response.Message = "Data not found in list";
                    return StatusCode(StatusCodes.Status200OK,response);
                }
                else
                {
                    response.Status = true;
                    response.Message = "Show data successfully!";
                    response.Data= mapp.ToList();
                    return StatusCode(StatusCodes.Status200OK,response);
                }
            }catch(AutoMapperMappingException auto)
            {
                response.Status = false;
                response.Message = "Error automap route list " + auto.InnerException?.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }


            catch (Exception ex)
            {
                response.Status = false;
                response.Message="Error Get Route list "+ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseMessage>>GetSingleRoute(string id)
        {
            try
            {

                var data = await _dbtims2.OprRouteHeader.Include(x=>x.RouteLine).FirstOrDefaultAsync(x => x.RouteNo == id.ToString().Trim());
                if (data == null)
                {
                    response.Message = "Route data not found or ENter valid details ";
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                else
                {
                    response.Status = true;
                    response.Message = "Route data show successfully !";
                    response.Data = data;
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                

            }catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error Single route get " + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ResponseMessage>> CreateRoute([FromBody]OprRouteCreateUpdateDto route)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    response.Status = false;
                    response.Message = "input Field is required   " ;
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                var data =await _dbtims2.OprRouteHeader.FirstOrDefaultAsync(x => x.RouteNo==route.RouteNo.ToString().Trim());
                var MaxNumber = await _dbtims2.OprRouteHeader.Where(x => x.RouteNo.StartsWith(route.OriginHub.ToString()))
                    .MaxAsync(c => Convert.ToString(3));
                if (data != null)
                {
                    response.Status = false;
                    response.Message = "Route All ready exist  "+route.RouteNo;
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                else
                {
                    var mapp = _mapper.Map<OprRouteHeader>(route);
                    mapp.CreatedOn = DateTime.Now;
                    await _dbtims2.OprRouteHeader.AddAsync(mapp);
                    await _dbtims2.SaveChangesAsync();
                    response.Status = true;
                    response.Message = "Route Create Successfully!  " + route.RouteNo;
                    return StatusCode(StatusCodes.Status200OK, response);
                }


            }
            catch (DbUpdateException dbEx)
            {
                response.Status = false;
                response.Message = "Failed to insert data. Please check constraints or duplicate values." + dbEx.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error Add Route Data " + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseMessage>>UpdateRoute(string id,[FromBody]OprRouteCreateUpdateDto routeUpdate)
        {
            try
            {
                var data = await _dbtims2.OprRouteHeader.FirstOrDefaultAsync(x => x.RouteNo == id.ToString().Trim());

                if (data == null)
                {
                    response.Message = "data not found Enter valid details ";
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                else
                {
                    routeUpdate.ModifiedOn = DateTime.Now.ToString();
                    var mapp = _mapper.Map(routeUpdate, data);
                    await _dbtims2.SaveChangesAsync();

                    response.Status = true;
                    response.Message = "Route update Successfully";
                    response.Data = null;

                    return StatusCode(StatusCodes.Status200OK, response);

                }

            }catch(DbUpdateException dbex)
            {
                response.Status = false;
                response.Message = "Failed to Update data. Please check constraints or duplicate values." + dbex.Message.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error update route header " + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
       
        
        
        [HttpDelete("{id}")]    
        public async Task<ActionResult<ResponseMessage>>DeleteRoute(string id)
        {
            try
            {
                var data = await _dbtims2.OprRouteHeader.FirstOrDefaultAsync(x => x.RouteNo == id.ToString().Trim());
                if(data != null)
                {
                      _dbtims2.OprRouteHeader.Remove(data);
                    await _dbtims2.SaveChangesAsync();

                    response.Status = true;
                    response.Message = "Route Delete successfully !";
                    response.Data = null;
                    return StatusCode(StatusCodes.Status200OK, response);

                }
                else
                {
                    response.Message = "Data not found Or Enter valid details !";
                    response.Data =null;
                    return StatusCode(StatusCodes.Status200OK, response);
                }

               
            }catch(DbUpdateException dbEx)
            {
                response.Message = " Failed to delete route. Please check constraints or duplicate values." + dbEx.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error While deleting route "+ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }




        [HttpPost("RouteSerch")]
        public async Task<ActionResult<ResponseMessage>> Serch([FromBody] RouteSerchDto serch)
        {
            try
            {

                var data =  _dbtims2.OprRouteHeader.AsQueryable();

                if (!string.IsNullOrWhiteSpace(serch.RouteNo.ToString()))
                {
                    data = data.Where(x => x.RouteNo.Contains(serch.RouteNo.ToString()));
                }
                if (!string.IsNullOrWhiteSpace(serch.RouteName.ToString()))
                {
                    data = data.Where(x => x.RouteName.Contains(serch.RouteName.ToString()));
                }
                var serchrlist = await data.ToListAsync();
                if (serchrlist.Any())
                {
                    response.Status = true;
                    response.Message = "List show successfull !";
                    response.Data = serchrlist;
                    return StatusCode(StatusCodes.Status200OK, response);
                 
                }
                response.Message = "No data in list";
                return StatusCode(StatusCodes.Status200OK, response);

            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error While Serch route" + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
        
        
        [HttpGet("RouteLineList")]   
    public async Task<ActionResult<ResponseMessage>> GetList()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var data = await _dbtims2.OprRouteLine.Select(x=>new OprRouteLineDto {
                        RouteNo=x.RouteNo,RouteBranch=x.RouteBranch,ActiveStatus=x.ActiveStatus,
                    }).ToListAsync();

                    if (data == null)
                    {
                        response.Message = "data not found in list";
                        return Ok(response);
                    }

                    var mapp = _mapper.Map<List<OprRouteLineDto>>(data);

                    response.Status = true;
                    response.Message = "  Data show successfully ! ";
                    response.Data = mapp;
                    return Ok(response);


                }
                else
                {
                    response.Message = "input field is not valid ";
                return Ok(response);
                }

            }
            catch (AutoMapperMappingException auto)
            {
                response.Status = false;
                response.Message = "Error automap  list " + auto.InnerException?.Message;
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error Get list" + ex.Message;
                return BadRequest(response);
            }
        }


        [HttpGet("GetRouteSingle/{RouteNo}/{RouteBranch}")]
        public async Task<ActionResult<ResponseMessage>>GetSingleRoute(string RouteNo,string RouteBranch)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(RouteNo) || string.IsNullOrWhiteSpace(RouteBranch))
                {
                    response.Message = "RouteNo and routeBranch are required !";
                    return Ok(response);
                }

                var data = await _dbtims2.OprRouteLine.FirstOrDefaultAsync(x => x.RouteNo==RouteNo && x.RouteBranch == RouteBranch);
              

                var mapp = _mapper.Map<OprRouteLineDto>(data);
                if (mapp == null)
                {
                    response.Message = "Data not found !";
                    return Ok(response);
                }

                response.Status = true;
                response.Message = "Data show successfully !";
                response.Data = mapp;
                return Ok(response);


            }
            catch(AutoMapperMappingException auto)
            {
                response.Status = false;
                response.Message = "Error automap  data  " + auto.InnerException?.Message;
                return BadRequest(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = "Error " + ex.Message;
                return BadRequest(response);
            }
        }


        [HttpPut("RouteLine")]

        public async Task<ActionResult<ResponseMessage>> Update([FromBody]OprRouteLineDto RouteLine)
        {
            try
            {
                return response;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = "Error " + ex.Message;
                return BadRequest(response);
            }
        }
    
        
    }
}
;