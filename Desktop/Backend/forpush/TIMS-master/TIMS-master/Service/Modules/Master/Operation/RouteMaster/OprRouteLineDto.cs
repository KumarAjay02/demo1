using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Modules.Master.Operation.RouteMaster
{
    public class OprRouteLineDto
    {
        [Required]
        public string? RouteNo { get; set; }
        [Required]
        public string? RouteBranch { get; set; }
        [Required]
        public string? ActiveStatus { get; set; }
        public string? Transistan { get; set; }
        public int? Kms { get; set; }
        public int? Transtime { get; set; }
        public string? CreatedBy { get; set; }
        [JsonIgnore]
        public string? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        [JsonIgnore]
        public string? ModifiedOn { get; set; }

        [JsonIgnore]
        public OprRouteHeaderDto? RouteHeader {  get; set; } 

    }
}
