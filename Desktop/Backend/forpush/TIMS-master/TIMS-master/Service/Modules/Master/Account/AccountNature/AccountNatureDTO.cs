namespace Backend.Modules.Master.Account.AccountNature
{
    public class AccountNatureDTO
    {
        public int serialNo { get; set; }
        public int accountNature { get; set; }
        public string accountNatureDesc { get; set; } = null!;
        public string? isActive { get; set; }
        public string? createdBy { get; set; }
        public DateTime? createdOn { get; set; }
        public string? modifiedBy { get; set; }
        public DateTime? modifiedOn { get; set; }

    }
}
