using Backend.Data.Contexts;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Common.State;
using Backend.Modules.Master.Country;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities;

public partial class CityMaster
{
    public int Id { get; set; }

    public int SerialNo { get; set; }
    [Key]
    [StringLength(4)]
    public string CityCode { get; set; } = null!;

    public string CityName { get; set; } = null!;

    public decimal? PinCode { get; set; }

    public string? StdCode { get; set; }

    public string? Category { get; set; }

    public string? Zone { get; set; }

    public string? StateCode { get; set; }  

    public string? CountryCode { get; set; }

    public string? DomInt { get; set; }

    public string IsActive { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public virtual CountryMaster? CountryMaster { get; set; }
    public virtual StateMaster? StateMaster { get; set; }
}


