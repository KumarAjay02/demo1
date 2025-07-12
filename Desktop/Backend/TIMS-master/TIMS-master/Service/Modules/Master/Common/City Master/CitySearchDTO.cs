using Backend.models;
using Backend.Models.Entities;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Backend.DTOs
{
    public class CitySearchDTO
    {
        public string? cityCode { get; set; }
        public string? cityName { get; set; }
        public string? fileType { get; set; }
    }
}
