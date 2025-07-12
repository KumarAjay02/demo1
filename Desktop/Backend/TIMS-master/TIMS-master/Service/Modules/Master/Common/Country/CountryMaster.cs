using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Modules.Master.Common.State;

namespace Backend.Modules.Master.Country;
public partial class CountryMaster
{
    public int Id { get; set; }

    public int SerialNo { get; set; }

    [Key]
    [StringLength(5)]
    public string CountryCode { get; set; } = null!;

    public string CountryName { get; set; } = null!;

    public string? Continent { get; set; }

    public string? Capital { get; set; }

    public string Currency { get; set; } = null!;

    public string IsActive { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }
    //public virtual ICollection<CityMaster> CityMasters { get; set; } = new List<CityMaster>();
    public virtual ICollection<StateMaster> StateMasters { get; set; } = new List<StateMaster>();


}
