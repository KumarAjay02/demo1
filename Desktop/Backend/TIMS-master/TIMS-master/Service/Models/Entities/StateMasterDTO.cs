using System;
using System.Collections.Generic;

namespace Backend.Models.Entities;

public partial class StateMasterDTO
{
    public int Id { get; set; }

    public int SerialNo { get; set; }

    public string StateCode { get; set; } = null!;

    public string StateName { get; set; } = null!;

    public string CountryCode { get; set; } = null!;

    public string? Zone { get; set; }

    public string? Capital { get; set; }

    public string IsActive { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public string? StateNo { get; set; }

    public string? Smgstin { get; set; }

    public string? SmeWayBillUserId { get; set; }

    public string? SmeWayBillPassword { get; set; }

    public string? EwayBillGenStates { get; set; }

    public string? GstinnoAvailable { get; set; }
}
