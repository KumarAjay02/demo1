namespace Backend.Shared.ResponseMsg
{
    public class ResponseMessage
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; }
        public object Data { get; set; } = null;
    }
}
