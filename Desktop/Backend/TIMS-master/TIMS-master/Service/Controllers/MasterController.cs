using Backend.Data;
using Backend.Data.Contexts;
using Backend.DTOs;
using Backend.models;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;


//using Microsoft.AspNetCore.Mvc;

using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;
using System.Web.Http.Results;
using static System.Runtime.InteropServices.JavaScript.JSType;
//using System.Web.Http;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        public TimsContext Lcontext { get; }

        public MasterController(TimsContext context)
        {
            Lcontext = context;
        }

        [HttpPost]
        [Route("vehicle/add")]
        public IActionResult AddMaster([FromBody] VehicleMaster vehicleDto)
        {
            if (vehicleDto == null || string.IsNullOrWhiteSpace(vehicleDto.VEHICLE_NO))
            {
                return BadRequest("Vehicle No is required.");
            }
            var existingvehicle =  Lcontext.MstVehicles
                .FirstOrDefault(u => u.VehicleNo==vehicleDto.VEHICLE_NO);
            if (existingvehicle != null)
            {
                return BadRequest(error:"Vehicle is already registered.");
            }
            var vehiclemst = new MstVehicle
            {
                VehicleNo = vehicleDto.VEHICLE_NO,
                VehicleTypeId = vehicleDto.VEHICLE_TYPE_ID,
                EngineNo = vehicleDto.ENGINE_NO,
                ChesisNo = vehicleDto.CHESIS_NO,
                RegistrationValidTill = Convert.ToDateTime(vehicleDto.REGISTRATION_VALID_TILL),
                Isactive = vehicleDto.ISACTIVE,
                Model = vehicleDto.MODEL,
                Remarks = vehicleDto.REMARKS,
                OwnerId = vehicleDto.owner_id,
                EffDate = Convert.ToDateTime(vehicleDto.eff_Date),
                Insertdate = System.DateTime.Now,
            };
            Lcontext.MstVehicles.Add(vehiclemst);
             Lcontext.SaveChanges();
            return Ok(new { Id = vehiclemst.Id, vehicle_no = vehiclemst.VehicleNo });
        }
    }
}
