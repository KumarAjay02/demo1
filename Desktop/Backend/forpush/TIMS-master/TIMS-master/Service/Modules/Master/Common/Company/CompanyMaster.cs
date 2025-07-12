using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.Modules.Master.Common.Branch;

namespace Backend.Modules.Master.Common.Company;

public partial class CompanyMaster
{
    [Key]
    [StringLength(4)]
    public string CoCode { get; set; } = null!;

    public string CoName { get; set; } = null!;

    public string? Address1 { get; set; } = null!;

    public string? Address2 { get; set; } = null!;

    public string? Address3 { get; set; } = null!;

    public string? CountryCode { get; set; } = null!;

    public string? StateCode { get; set; } = null!;

    public string? CityCode { get; set; } = null!;

    public decimal?   PinCode { get; set; }

    public string? Gstn { get; set; } = null!;

    public string? Pan { get; set; } = null!;

    public virtual ICollection<BranchMaster>? BranchMasters { get; set; } = new List<BranchMaster>();
}
