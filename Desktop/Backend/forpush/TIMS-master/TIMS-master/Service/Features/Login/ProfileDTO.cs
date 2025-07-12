using Backend.models;
using Backend.Modules.Master.Admin.UserRights;

namespace Backend.Features.Login
{
    public class ProfileDTO
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string user { get; set; }

        public List<TrnUserright> Roles { get; set; }

       
    }
}
