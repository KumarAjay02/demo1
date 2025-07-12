using System.Text.Json.Serialization;

namespace Backend.Modules.Master.Operation.RouteMaster
{
    public class OprRouteLine
    {

        public string?   RouteNo { get; set; }  
        public string? RouteBranch { get; set; } 
        public string? ActiveStatus { get; set; } 
        public string? Transistan { get; set; } 
        public int? Kms { get; set; }
        public int? Transtime { get; set; }
        public string? CreatedBy { get; set; } 
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

     
        public OprRouteHeader? RouteHeader { get; set; }
    }
}
