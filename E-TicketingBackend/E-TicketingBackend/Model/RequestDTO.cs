using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_TicketingBackend.Model
{
    public class UserRequestDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [Required(ErrorMessage = "UserName Is Mandetory")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password Is Mandetory")]
        public string Password { get; set; }

        //[Required(ErrorMessage = "Confirm Password Is Mandetory")]
        //public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Role Is Mandetory")]
        public string Role { get; set; }

        public string NIC { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }


    public class TrainRequestDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string TrainName { get; set; }
        public string TrainCode { get; set; }
        public string  Status { get; set; }
    }

    public class ScheduleRequestDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string startingTime { get; set; }
        public string arrivalTime { get; set; }
        public List<TrainCreateDTO> train { get; set; }
        //public string train { get; set; }
        public string startPoint { get; set; }
        public string endPoint { get; set; }
        public string ticketPrice { get; set; }
        public string CommonStatus { get; set; }
    }

    public class TrainCreateDTO
    {
        public string _id { get; set; }
        public string TrainName { get; set; }
        public string TrainCode { get; set; }
        public string Status { get; set; }
    }





}
