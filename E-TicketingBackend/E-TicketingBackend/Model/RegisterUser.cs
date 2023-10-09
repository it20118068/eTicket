using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Authentication_System.Model
{
    //User registration Request DTO class
    public class RegisterUserRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [Required(ErrorMessage ="UserName Is Mandetory")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password Is Mandetory")]
        public string Password { get; set; }

        //[Required(ErrorMessage = "Confirm Password Is Mandetory")]
        //public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Role Is Mandetory")]
        public string Role { get; set; }

        [Required(ErrorMessage = "NIC Is Mandetory")]
        public string NIC { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }

    public class RegisterUserResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

    }
}
