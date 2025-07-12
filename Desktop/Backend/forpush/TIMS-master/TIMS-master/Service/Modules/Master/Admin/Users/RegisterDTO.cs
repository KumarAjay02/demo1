using Backend.Models.Entities;
using Microsoft.CodeAnalysis.Operations;
using Org.BouncyCastle.Asn1.Microsoft;
using Org.BouncyCastle.Bcpg.OpenPgp;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Backend.Modules.Master.Admin.Users
{
    public class RegisterDTO
    {

        public int id { get; set; }

        [Required(ErrorMessage = "Login is required.")]
        [MaxLength(10, ErrorMessage = "Login must be less than or equal to 10 characters.")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(50, ErrorMessage = "Name must be less than or equal to 50 characters.")]
        public string User { get; set; }
       
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [MaxLength(100, ErrorMessage = "Email must be less than or equal to 100 characters.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        [MaxLength(100, ErrorMessage = "Password must be less than or equal to 100 characters.")]
        public string Password { get; set; }
        public List<BranchMasterDTO> Branches { get; set; }

        public List<CompanyMasterDTO> Companies { get; set; }
        public List<DivisionMasterDTO> Divisions { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }

        public string DefaultPremises { get; set; }

        public string? Dept { get; set; }
        public string? Hodmail { get; set; }
        public string? Mobile { get; set; }

        public bool UserLock { get; set; }
        public bool PermLock { get; set; }

        public bool UserStatus { get; set; }

    }
}
