using System;
using System.Collections.Generic;

namespace Backend.models;

public partial class MstVehicle
{
    public int Id { get; set; }

    public int? VehicleTypeId { get; set; }

    public string? VehicleNo { get; set; }

    public string? EngineNo { get; set; }

    public string? ChesisNo { get; set; }

    public DateTime? RegistrationValidTill { get; set; }

    public string? Isactive { get; set; }

    public DateTime? Insertdate { get; set; }

    public string? Model { get; set; }

    public string? Remarks { get; set; }

    public int? OwnerId { get; set; }

    public DateTime? EffDate { get; set; }
}
