using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Backend.Models.Entities;
using Backend.Modules.Master.Common.State;

namespace Backend.Modules.Master.Common.Country
{
    public class CountryMasterDto
    {
        public string SerialNo { get; set; }
        //[Required(ErrorMessage =("Country Code is required !"))]
        public string CountryCode { get; set; } 
        //[Required(ErrorMessage =("Country Name is required !"))]
        public string CountryName { get; set; }  

        public string? Continent { get; set; }
        //[Required(ErrorMessage =("capital is required !"))]
        public string? Capital { get; set; }
        //[Required (ErrorMessage =("Please Select Currency !"))]
        public string Currency { get; set; }  
        //[Required]
        public string IsActive { get; set; } 

        public string? CreatedBy { get; set; }

        [JsonIgnore]
        public string? CreatedOn { get; set; } = null;

        public string? ModifiedBy { get; set; }
        [JsonIgnore]
        public string? ModifiedOn { get; set; } = null;
        //public List<CityMasterDTO>? CityMasters { get; set; }
        public List<StateMasterDto>? StateMasters { get; set; }



    }
}
