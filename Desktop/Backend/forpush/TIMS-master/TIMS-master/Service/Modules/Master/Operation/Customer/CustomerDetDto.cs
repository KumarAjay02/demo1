using Backend.Models.Entities;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Common.PinCode;
using System;
using System.Collections.Generic;

namespace Backend.Modules.Master.Operation.Customer
{
    public class CustomerDetDto
    {
        public string CoCode { get; set; }
        public string DivCode { get; set; }
        public string Branch { get; set; }
        public int? CustomerCode { get; set; } = 0;
        public int? CustomerDetCode { get; set; }
        public string? PoNo { get; set; }
        public string? Gstin { get; set; } 
        public decimal? Surcharge { get; set; } = 0;
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? CityName { get; set; }

        public CityMasterDTO? CityMaster { get; set; }

        public string? State { get; set; }
        public string? StateName { get; set; }
        public StateMasterDTO StateMaster { get; set; }
        public decimal? PinCode { get; set; }

        public PincodeMasterDTO? PinCodeMaster { get; set; }
        public string? Country { get; set; }
        public string? CountryName { get; set; }

        public CountryMasterDto? CountryMaster { get; set; }
        public string? DealingPerson1 { get; set; } 
        public string? Email1 { get; set; }
        public decimal? LandlineNo1 { get; set; } 
        public decimal? MobileNo1 { get; set; }
        public string? DealingPerson2 { get; set; } 
        public string? Email2 { get; set; } 
        public decimal? MobileNo2 { get; set; } 
        public string? IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public List<CustomerDet2Dto> CustomerDet2s { get; set; } = new List<CustomerDet2Dto>();
    }
}