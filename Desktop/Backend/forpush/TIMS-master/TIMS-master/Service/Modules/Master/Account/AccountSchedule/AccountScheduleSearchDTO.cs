namespace Backend.Modules.Master.Account.AccountSchedule
{
    public class AccountScheduleSearchDTO
    {
        public int? scheduleCode { get; set; }
        public string? scheduleDesc { get; set; }
        public int? glNature { get; set; }
        public string? accountNatureDesc { get; set; } 
        public string? fileType { get; set; }
    }
}
