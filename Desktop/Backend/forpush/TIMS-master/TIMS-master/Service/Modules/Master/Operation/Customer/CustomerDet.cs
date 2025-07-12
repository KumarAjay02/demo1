using Backend.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Operation.Customer
{
    [Table("Customer_Det")]
    public class CustomerDet
    {
        [Key, Column(Order = 0)]
        [StringLength(4)]
        public string CoCode { get; set; }

        [Key, Column(Order = 1)]
        [StringLength(4)]
        public string DivCode { get; set; }

        [Key, Column(Order = 2)]
        [StringLength(4)]
        [ForeignKey("BranchCode")]
        public string Branch { get; set; }

        [Key, Column(Order = 3)]
        public int CustomerCode { get; set; }

        [Key, Column(Order = 4)]
        public int CustomerDetCode { get; set; }

        [StringLength(100)]
        public string? PoNo { get; set; }

        [StringLength(15)]
        public string? Gstin { get; set; }

        [Column(TypeName = "decimal(15, 2)")]
        public decimal? Surcharge { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(5)]
        public string? City { get; set; }

        [StringLength(2)]
        public string? State { get; set; }

        [StringLength(5)]
        //[ForeignKey("Country")]
        public string? Country { get; set; }



        [Column(TypeName = "decimal(6, 0)")]
        [ForeignKey("PinCode")]
        public decimal? PinCode { get; set; }


        [StringLength(100)]
        public string? DealingPerson1 { get; set; }

        [StringLength(100)]
        public string? Email1 { get; set; }

        [Column(TypeName = "numeric(10, 0)")]
        public decimal? LandlineNo1 { get; set; }

        [Column(TypeName = "numeric(10, 0)")]
        public decimal? MobileNo1 { get; set; }

        [StringLength(100)]
        public string? DealingPerson2 { get; set; }

        [StringLength(100)]
        public string? Email2 { get; set; }

        [Column(TypeName = "numeric(10, 0)")]
        public decimal? MobileNo2 { get; set; }

        [StringLength(1)]
        public string? IsActive { get; set; }

        [StringLength(10)]
        public string? CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        [StringLength(10)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [ForeignKey("CoCode,DivCode,CustomerCode")]
        public Customer Customer { get; set; }=new Customer();

        public ICollection<CustomerDet2> CustomerDet2s { get; set; } = new List<CustomerDet2>();


    }
}