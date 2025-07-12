using System.ComponentModel.DataAnnotations;

namespace Backend.Features.Login
{
    public class AuthenticateDTO
    {
       
        [Required(ErrorMessage = "Login is required.")]
        [MaxLength(20, ErrorMessage = "Login must be less than or equal to 20 characters.")]
        public string username { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(5, ErrorMessage = "Password must be at least 5 characters long.")]
        [MaxLength(100, ErrorMessage = "Password must be less than or equal to 100 characters.")]
        public string password { get; set; }
        [Required(ErrorMessage = "ClientId is required.")]
        public bool rememberMe { get; set; }
    }
}
