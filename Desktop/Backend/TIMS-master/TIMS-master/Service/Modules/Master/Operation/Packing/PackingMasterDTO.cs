using System.ComponentModel.DataAnnotations;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Backend.Modules.Master.Operation.Packing
{
    public class PackingMasterDTO
    {

        [Required]
        [MaxLength(5,ErrorMessage ="Please Enter Code and Max Length 5")]
        public string Code { get; set; } = string.Empty;

        [Required]
        [MaxLength(50,ErrorMessage = "Please Enter Description and Max length 50 ")]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(1, ErrorMessage = "Please Y / N")]
        public string IsActive { get; set; } = "Y";
        
    }
}
