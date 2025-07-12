using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Modules.Master.Common.CompanyDivision;

public partial class CompDivision
{
    public string CoCode { get; set; } = null!;

    [Key]
    [StringLength(4)]
    public string DivCode { get; set; }

    public string DivName { get; set; } = null!;

    public string Address1 { get; set; } = null!;

    public string Address2 { get; set; } = null!;

    public string Address3 { get; set; } = null!;

    public string Gstn { get; set; } = null!;

    public string Pan { get; set; } = null!;
}
