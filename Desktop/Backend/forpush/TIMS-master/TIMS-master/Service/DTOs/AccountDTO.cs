using Backend.models;

namespace Backend.DTOs
{
    public class AccountDTO
    {
        public bool activated { get; set; }
        public string[]  authorities { get; set; }
        public string  email { get; set; }
        public string firstName { get; set; }
        public string langKey { get; set; }
        public string lastName { get; set; }
        public string login { get; set; }
        public string imageUrl { get; set; }

       
    }
}
