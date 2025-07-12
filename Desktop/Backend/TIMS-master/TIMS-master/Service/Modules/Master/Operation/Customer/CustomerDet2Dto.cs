namespace Backend.Modules.Master.Operation.Customer
{
    public class CustomerDet2Dto
    {
        public string CoCode { get; set; }
        public string DivCode { get; set; }
        public string Branch { get; set; }
        public int? CustomerCode { get; set; } = 0;
        public int? CustomerDetCode { get; set; }
        public int? PlantCode { get; set; }
        public string? PlantName { get; set; }
        public string? PlantAddress { get; set; }

        public string? IsActive { get; set; }
    }
}