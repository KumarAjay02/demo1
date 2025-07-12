using Backend.Features.Login;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities;

[Table("mst_USER_DIVISIONS")]
public partial class MstUserDivision
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string DivisionCode { get; set; } = null!;
    public MstUser User { get; set; } // Navigation property
}
