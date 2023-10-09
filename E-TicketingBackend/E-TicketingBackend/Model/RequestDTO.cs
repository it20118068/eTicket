using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_TicketingBackend.Model
{
    //All request DTO class
    public class RequestDTO
    {
        public string? trainCode { get; set; }
        public UserDTO? userDto { get; set; }
        public TicketDTO? ticketDto { get; set; }
        public ScheduleDTO? scheduleDTO { get; set; }
        public TrainDTO? trainDTO { get; set; }
    }
}
