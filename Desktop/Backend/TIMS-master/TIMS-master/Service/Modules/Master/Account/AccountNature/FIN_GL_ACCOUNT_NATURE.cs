using System.ComponentModel.DataAnnotations;

namespace Backend.Modules.Master.Account.AccountNature
{
    public partial class Fin_Gl_Account_Nature
    {
        [Key]
        public int SerialNo { get; set; }
        public int AccountNature { get; set; }
        public string AccountNatureDesc { get; set; } = null!;
        public string? IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        //public virtual ICollection<Fin_Gl_Account_Schedules> Fin_Gl_Account_Schedules { get; set; } = new List<Fin_Gl_Account_Schedules>();
    }
}
