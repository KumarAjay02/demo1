using Backend.Models.Entities;
using Backend.Modules.Master.Admin.UserRights;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Features.Login;

public partial class MstUser
{
    public int Id { get; set; }

    public string? User { get; set; }

    public string Login { get; set; }

    public string Password { get; set; }

    public string? Dept { get; set; }

    public string? Email { get; set; }
    public string? mobile { get; set; }


    public string? HodMail { get; set; }

    [Column("USER_LOCK")]
    public int? UserLock { get; set; }

    [Column("USER_COUNTER")]
    public int? UserCounter { get; set; }

    [Column("USER_STATUS")]
    public int? UserStatus { get; set; }

    [Column("EQU_ADMIN")]
    public int? EquAdmin { get; set; }

    public string? Premisess { get; set; }

    [Column("UNLOCK_DATE")]
    public DateTime? UnlockDate { get; set; }

    [Column("PRDATE")]
    public DateTime? PrDate { get; set; }

    [Column("PERMLOCK")]
    public int? PermLock { get; set; }

    [Column("DEFAULT_PREMISES")]
    public string? DefaultPremises { get; set; }

    public ICollection<TrnUserright>? UserRights { get; set; }
    public ICollection<MstUserCompany>? UserCompanies { get; set; }
    public ICollection<MstUserDivision>? UserDivisions { get; set; }
    public ICollection<MstUserBranch>? UserBranches { get; set; }
}
