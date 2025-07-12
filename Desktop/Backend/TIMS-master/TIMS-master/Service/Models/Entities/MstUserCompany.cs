using Backend.Features.Login;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities;

[Table("mst_USER_COMPANIES")]
public partial class MstUserCompany
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string CompanyCode { get; set; } = null!;
    public MstUser User { get; set; } // Navigation property
    //public CompanyMaster Company { get; set; }
}
