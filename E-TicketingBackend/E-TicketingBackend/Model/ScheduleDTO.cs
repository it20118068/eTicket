using E_TicketingBackend.enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace E_TicketingBackend.Model
{
    //Train Schedule DTO class
    public class ScheduleDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string startingTime { get; set; }
        public string arrivalTime { get; set; }
        public  TrainDTO train { get; set; }
        public string startPoint { get; set; }
        public string endPoint { get; set; }
        public long ticketPrice { get; set; }
        public int Status { get; set; }
    }
}
