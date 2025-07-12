// Models/Entities/PackingMaster.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Packing_Master")]
public class PackingMaster
{

    [Key]
    [Required, StringLength(5)]
    public string Code { get; set; }

    [Required, StringLength(50)]
    public string Description { get; set; }

    [Required, StringLength(1)]
    public string IsActive { get; set; }

    public string? Created_By { get; set; }
    public DateTime? Created_On { get; set; }
    public string? Modfied_By { get; set; }
    public DateTime? Modified_On { get; set; }
}
