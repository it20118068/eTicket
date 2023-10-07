namespace E_TicketingBackend.Model
{
    public class UserResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<UserRequestDTO> data { get; set; }
        public string Token { get; set; }
    }


    public class TrainResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<TrainRequestDTO> data { get; set; }
    }

    public class ScheduleResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<ScheduleRequestDTO> data { get; set; }
    }

}
