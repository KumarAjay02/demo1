using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Models.Entities;

namespace Backend.Modules.Master.Operation.RouteMaster
{
    public class OprRouteHeaderDto
    {
        [Required]
        public string CoCode { get; set; } = null!;
        [Required]
        public string DivCode { get; set; } = null!;
        [Required]
        public string RouteNo { get; set; } = null!;
        [Required]
        public string RouteName { get; set; } = null!;
        [Required]
        public string RouteType { get; set; } = null!;
        [Required]
        public string OriginHub { get; set; } = null!;
        [Required]
        public string DestHub { get; set; } = null!;
        [Required]
        public string ActiveStatus { get; set; } = null!;

        public string? PositionVehicle { get; set; }

        public decimal TotalKm { get; set; }

        public int TotalTt { get; set; }

        public string? ViaLoc { get; set; }

        public int SrNo { get; set; }
        public string? CreatedBy { get; set; }
        [JsonIgnore]
        public string? CreatedOn { get; set; }

        public string? ModifiedBy { get; set; }

        [JsonIgnore]
        public string? ModifiedOn { get; set; }


        public List<OprRouteLineDto> RouteLine { get; set; }

    }
}
