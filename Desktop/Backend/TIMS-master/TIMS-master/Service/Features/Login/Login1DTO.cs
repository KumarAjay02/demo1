using System.ComponentModel.DataAnnotations;

namespace Backend.Features.Login
{
    public class Login1DTO
    {

        [Required(ErrorMessage = "Login is required.")]
        [MaxLength(20, ErrorMessage = "Login must be less than or equal to 20 characters.")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(5, ErrorMessage = "Password must be at least 5 characters long.")]
        [MaxLength(100, ErrorMessage = "Password must be less than or equal to 100 characters.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "ClientId is required.")]
        public string ClientId { get; set; }
        [Required(ErrorMessage = "ClientId is required.")]
        public bool rememberMe { get; set; }
        public string SystemIp { get; set; }
        public string SystemName { get; set; }
    }
}
