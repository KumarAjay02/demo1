using Backend.models;
using Backend.Models.Entities;
using DocumentFormat.OpenXml.Spreadsheet;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Modules.Master.Admin.UserRights
{
    public class UserRightsDTO
    {
        public string? user { get; set; }
        public long? id { get; set; }
        public int? menuId { get; set; }
        public string? menuName { get; set; }
        public string? menuType { get; set; }
        public  bool view { get; set; }
        public bool search { get; set; }
        public bool add { get; set; }
        public bool update { get; set; }
        public bool deleted { get; set; }
        public bool print { get; set; }
        public bool approval { get; set; }
        public bool isActive { get; set; }
        public string? url { get; set; }

        [Column("PARENTMENU_ID")]
        public int? ParentMenuId { get; set; }

    }
}
