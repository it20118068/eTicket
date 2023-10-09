namespace E_TicketingBackend.Model


{
    //All response DTO class
    public class ResponseDTO
    {
        public List<TicketDTO> ticketDTOs { get; set; }
        public List<ScheduleDTO> scheduleDTOs { get; set; }
        public List<TrainDTO> trainDTOs { get; set; }
        public List<UserDTO> userDTOs { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
}
