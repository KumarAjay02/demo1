using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Operation.BookingBasis
{
    public class BookingBasisModeDto
    {



        [Key]
        [Required]
        [MaxLength(50, ErrorMessage = "Please Enter Code and Max length 50 ")]
        public string Code { get; set; } = string.Empty;

        [Required]
        [MaxLength(50, ErrorMessage = "Please Enter Description and Max length 50 ")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(1, ErrorMessage = "Please Y / N")]
        public string IsActive { get; set; } = "Y";

    }
}
