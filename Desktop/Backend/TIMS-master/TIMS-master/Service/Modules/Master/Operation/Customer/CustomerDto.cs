using System;
using System.Collections.Generic;

namespace Backend.Modules.Master.Operation.Customer
{
    public class CustomerDto
    {
        public string CoCode { get; set; }
        public string DivCode { get; set; }
        public int? CustomerCode { get; set; }
        public string? CustomerName { get; set; }

        public string? SuntekCode { get; set; }

        public string? TradeName { get; set; } 
        public string? Type { get; set; }
        public string? WebSite { get; set; } = "";
        public string? IsActive { get; set; }
        public string? BillPartyStatus { get; set; }
        public string? RegStatus { get; set; }
        public string FcmFlag { get; set; } = "N";
        public string OutStandingMailFlag { get; set; } = "N";
        public int? CreditDays { get; set; }
        public string? BillingBase { get; set; }
        public string? OemFlag { get; set; }
        public int? CreditDaysAir { get; set; }
        public int? CreditDaysTrain { get; set; }
        public string? CpaymentType { get; set; }
        public string? EinvoiceMail { get; set; }
        public string? BillBranch { get; set; }
        public string? TempCustomer { get; set; }
        public string? PanNo { get; set; }
        public string TaxApplicable { get; set; } = "y";
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public List<CustomerDetDto> CustomerDets { get; set; } = new List<CustomerDetDto>();
    }
}