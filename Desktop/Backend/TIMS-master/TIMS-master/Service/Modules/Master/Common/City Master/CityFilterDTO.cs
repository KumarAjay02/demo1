using Backend.models;
using Backend.Models.Entities;

namespace Backend.DTOs
{
    public class CityFilterDTO
    {
        public string stateCode { get; set; }
        public string txt { get; set; }
    }
}
