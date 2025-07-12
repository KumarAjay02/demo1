using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Features.Login;
using Backend.Features.MenuList;

namespace Backend.Modules.Master.Admin.UserRights;

public partial class TrnUserright
{
    public long Id { get; set; }
    public string User { get; set; }

    [Column("MENU_ID")]
    public int? MenuId { get; set; }
    public string? View { get; set; }
    public string? Add { get; set; }
    public string? Update { get; set; }
    public string? Delete { get; set; }
    public string? Print { get; set; }
    public string? Approval { get; set; }
    public string? IsActive { get; set; }
    [Column("SEARCH")]
    public string? Search { get; set; }
    public DateTime? InsertDate { get; set; }
    public string? MType { get; set; }

    public MstMenu? Menu { get; set; }
    public MstUser? MstUser { get; set; }
}
