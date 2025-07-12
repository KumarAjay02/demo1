using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Operation.BookingBasis
{
    [Table("Booking_Basis_Mode")]
    public class BookingBasisModeModel
    {

        //public int Id { get; set; } = 0;
        [Key]
        [Required, StringLength(50)]
        public string Code { get; set; }


        [Required, StringLength(50)]
        public string Description { get; set; }


        public string? IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }

}
