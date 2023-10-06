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

        [Required(ErrorMessage = "Confirm Password Is Mandetory")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Role Is Mandetory")]
        public string Role { get; set; }
        public string NIC { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }



    }
}
