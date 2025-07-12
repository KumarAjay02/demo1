using System.ComponentModel.DataAnnotations;

namespace Backend.Modules.Master.Account.CostCodeType
{
    public partial class fin_cost_code_type
    {
        [Key]
        public int costCodeId { get; set; }
        public string costCodeTypeDesc { get; set; } = null!;
        public string? status { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
