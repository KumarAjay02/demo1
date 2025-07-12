using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.Models.Entities;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Country;

namespace Backend.Modules.Master.Common.State;

public partial class StateMaster
{
    public int Id { get; set; }

    public int SerialNo { get; set; }

    [Key]
    [StringLength(4)]
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

    public virtual CountryMaster CountryMaster { get; set; } = null!;
    public virtual ICollection<CityMaster> CityMasters { get; set; } = new List<CityMaster>();

 
}
