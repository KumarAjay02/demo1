namespace Backend.Modules.Master.Account.CostCodeType
{
    public class fin_cost_code_typeDTO
    {
        public int costCodeId { get; set; }
        public string costCodeTypeDesc { get; set; } = null!;
        public string? status { get; set; }
        public string? createdBy { get; set; }
        public DateTime? createdOn { get; set; }
        public string? modifiedBy { get; set; }
        public DateTime? modifiedOn { get; set; }
    }
}
