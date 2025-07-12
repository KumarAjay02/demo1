using Backend.Features.Login;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities;

[Table("mst_USER_BRANCHES")]
public partial class MstUserBranch
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public MstUser User { get; set; } // Navigation property

    public string BranchCode { get; set; } = null!;
}
