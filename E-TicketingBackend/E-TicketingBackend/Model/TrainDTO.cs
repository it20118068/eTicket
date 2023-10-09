using E_TicketingBackend.enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace E_TicketingBackend.Model

{
    //Train DTO class
    public class TrainDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string TrainName { get; set; }
        public string TrainCode { get; set; }
        public int status { get; set; }
    }
}
