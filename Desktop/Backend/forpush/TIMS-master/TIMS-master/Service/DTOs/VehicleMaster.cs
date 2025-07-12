namespace Backend.DTOs
{
    public class VehicleMaster
    {
        public int ID { get; set; }
        public int VEHICLE_TYPE_ID { get; set; }
        public string VEHICLE_NO { get; set; }
        public string ENGINE_NO { get; set; }
        public string CHESIS_NO { get; set; }
        public string REGISTRATION_VALID_TILL{ get; set; }
        public string ISACTIVE { get; set; }
        public string MODEL{ get; set; }
        public string REMARKS { get; set; }
        public int owner_id { get; set; }
        public string eff_Date { get; set; }
    }
}
