using Backend.models;
using Backend.Models.Entities;

namespace Backend.Features.MenuList
{
    public class MenuDTO
    {
        public int menuId { get; set; }
        public string menuName { get; set; }
        public  string mType { get; set; }
        public string url { get; set; }
    }
}
