namespace Backend.Modules.Master.Account.AccountSchedule
{
    public class AccountScheduleDTO
    {
        public int serialNo { get; set; }
        public int scheduleCode { get; set; }
        public string scheduleDesc { get; set; } = null!;
        public int glNature { get; set; }
        public string? accountNatureDesc { get; set; }
        public string? status { get; set; }
        public string? createdBy { get; set; }
        public DateTime? createdOn { get; set; }
        public string? modifiedBy { get; set; }
        public DateTime? modifiedOn { get; set; }
    }
}
