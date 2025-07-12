using System.ComponentModel.DataAnnotations;

namespace Backend.Features.Login
{
    public class UpdateProfileDTO
    {
        [MaxLength(50, ErrorMessage = "User name must be less than or equal to 50 characters.")]
        public string User { get; set; }

        [MaxLength(10, ErrorMessage = "Login must be less than or equal to 10 characters.")]
        public string Login { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [MaxLength(100, ErrorMessage = "Email must be less than or equal to 100 characters.")]
        public string Email { get; set; }
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        [MaxLength(100, ErrorMessage = "Password must be less than or equal to 100 characters.")]
        public string Password { get; set; }
    }
}
