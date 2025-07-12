using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Operation.Customer
{
    [Table("Customer")]
    public class Customer
    {
        [Key, Column(Order = 0)]
        [StringLength(4)]
        public string CoCode { get; set; }

        [Key, Column(Order = 1)]
        [StringLength(4)]
        public string DivCode { get; set; }

        [Key, Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerCode { get; set; }

        [StringLength(50)]
        public string CustomerName { get; set; }

        [StringLength(15)]
        public string Type { get; set; }

        [StringLength(50)]
        public string? WebSite { get; set; }

        [StringLength(1)]
        public string IsActive { get; set; }

        [StringLength(1)]
        public string? BillPartyStatus { get; set; }

        [StringLength(1)]
        public string? RegStatus { get; set; }

        [StringLength(1)]
        public string FcmFlag { get; set; } = "N";

        [StringLength(1)]
        public string OutStandingMailFlag { get; set; } = "N";

        public int? CreditDays { get; set; }

        [StringLength(10)]
        public string? BillingBase { get; set; }

        [StringLength(1)]
        public string? OemFlag { get; set; }

        public int? CreditDaysAir { get; set; }
        public int? CreditDaysTrain { get; set; }

        [StringLength(10)]
        public string? CpaymentType { get; set; }

        [StringLength(1)]
        public string? EinvoiceMail { get; set; }

        [StringLength(4)]
        public string? BillBranch { get; set; }

        [StringLength(1)]
        public string? TempCustomer { get; set; }

        [StringLength(10)]
        public string? PanNo { get; set; }

        [StringLength(1)]
        public string TaxApplicable { get; set; } = "y";

        [StringLength(10)]
        public string? CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        [StringLength(10)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
        public string? SuntekCode { get; set; }
        public string? TradeName { get; set; }

        public ICollection<CustomerDet> CustomerDets { get; set; }=new List<CustomerDet>();
    }
}