using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Account.AccountSchedule
{
    public partial class Fin_Gl_Account_Schedules
    {
        [Key]
        public int SerialNo { get; set; }
        public int ScheduleCode { get; set; }
        public int GlNature { get; set; }
        public string ScheduleDesc { get; set; } = null!;
        public string? Status { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        //public virtual Fin_Gl_Account_Nature? Fin_Gl_Account_Natures { get; set; } = null!;
    }
}
