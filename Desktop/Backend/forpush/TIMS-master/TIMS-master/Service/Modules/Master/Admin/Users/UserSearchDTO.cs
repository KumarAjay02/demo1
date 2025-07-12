using Backend.models;
using Backend.Models.Entities;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Backend.Modules.Master.Admin.UserRights
{
    public class UserSearchDTO
    {
        public string? loginCode { get; set; }
        public string? userName { get; set; }
        public string? fileType { get; set; }
    }
}
