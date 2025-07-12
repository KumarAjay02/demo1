using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Modules.Master.Admin.UserRights;

namespace Backend.Features.MenuList;

public partial class MstMenu
{
    public int Id { get; set; }

    [Column("PARENTMENU_ID")]
    public int? ParentmenuId { get; set; }

    [Column("MENU_NAME")]
    public string? MenuName { get; set; }

    public string? Url { get; set; }

    public string? Isactive { get; set; }

    public DateTime? Insertdate { get; set; }

    public int? Ranking { get; set; }

    public string? Mtype { get; set; }


    public ICollection<TrnUserright>? UserRights { get; set; }
}
