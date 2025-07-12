using Backend.models;
using Backend.Models.Entities;

namespace Backend.Features.MenuList
{
    public class MenuListDTO
    {
        public int Id { get; set; }
        public string menuName { get; set; }
        public  string menyType { get; set; }
        public string link { get; set; }
        public int menuId { get; set; }
        public List<MenuListDTO> children { get; set; }
    }
}
