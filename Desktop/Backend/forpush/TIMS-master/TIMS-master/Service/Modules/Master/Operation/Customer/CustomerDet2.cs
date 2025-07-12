using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Operation.Customer
{
    [Table("Customer_Det2")]
    public class CustomerDet2
    {
        [Key, Column(Order = 0)]
        [StringLength(4)]
        public string CoCode { get; set; }

        [Key, Column(Order = 1)]
        [StringLength(4)]
        public string DivCode { get; set; }

        [Key, Column(Order = 2)]
        [StringLength(4)]
        public string Branch { get; set; }

        [Key, Column(Order = 3)]
        public int CustomerCode { get; set; }

        [Key, Column(Order = 4)]
        public int CustomerDetCode { get; set; }

        [Key, Column(Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? PlantCode { get; set; }

        [StringLength(30)]
        public string? PlantName { get; set; }

        [StringLength(50)]
        public string? PlantAddress { get; set; }

        [ForeignKey("CoCode,DivCode,Branch,CustomerCode,CustomerDetCode")]
        public CustomerDet CustomerDet { get; set; } = new CustomerDet();

        [StringLength(1)]
        public string? IsActive { get; set; }

    }
}