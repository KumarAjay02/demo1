using System.Text.Json.Serialization;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Common.State;

public class CityMasterDTO
{
    public int Id { get; set; }

    public int SerialNo { get; set; }

    public string CityCode { get; set; } = null!;

    public string CityName { get; set; } = null!;

    public decimal? PinCode { get; set; }

    public string? StdCode { get; set; }

    public string? Category { get; set; }

    public string? Zone { get; set; }

    public string? StateCode { get; set; } = null!;
    public string? StateName { get; set; } = null!;

    public string? CountryCode { get; set; } = null!;
    public string? CountryName { get; set; } = null!;

    public string? DomInt { get; set; }

    public string IsActive { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    [JsonIgnore]
    public CountryMasterDto countrymaster { get; set; }
    [JsonIgnore]
    public StateMasterDto statemaster { get; set; }
}
