using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Models.Entities;


namespace Backend.Modules.Master.Operation.RouteMaster;

public partial class OprRouteHeader
{
    public string CoCode { get; set; }

    public string DivCode { get; set; }

    public string RouteNo { get; set; } 

    public string RouteName { get; set; }

    public string RouteType { get; set; } 

    public string OriginHub { get; set; }

    public string DestHub { get; set; } 

    public string ActiveStatus { get; set; }

    public string? PositionVehicle { get; set; }

    public decimal TotalKm { get; set; }

    public int TotalTt { get; set; }

    public string? ViaLoc { get; set; }

    public int SrNo { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

  
    public virtual ICollection <OprRouteLine> RouteLine { get; set; }= new List<OprRouteLine>();
}
